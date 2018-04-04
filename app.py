#!/usr/bin/env python3
import json
import os
import sys
from functools import wraps

import redis
from apscheduler.schedulers.background import BackgroundScheduler
from flask import Flask, render_template, request, abort

from pydashboard import jobs
from pydashboard import widgets
from pydashboard.extensions import webpack, socketio


def create_app(settings_override=None):
    """
    Create the pyDashboard application.

    :param settings_override: Override settings
    :type settings_override: dict
    :return: Flask app
    """
    app = Flask(__name__)

    params = {
        'DEBUG': True,
        'WEBPACK_MANIFEST_PATH': './build/manifest.json'
    }

    app.config.update(params)
    app.config.from_object('pydashboard.config')
    settings_var = 'PYDASHBOARD_SETTINGS'
    if settings_var in os.environ:
        app.config.from_envvar(settings_var)

    if settings_override:
        app.config.update(settings_override)

    try:
        r = redis.StrictRedis(host=app.config['REDIS_HOST'], db=app.config['REDIS_DB'])
        app.config['REDIS'] = r
        print("Connected to redis")
    except:
        app.config['REDIS'] = None

    webpack.init_app(app)
    socketio.init_app(app)

    return app


app = create_app()
scheduler = BackgroundScheduler()


def protected(func):
    @wraps(func)
    def protect(*args, **kwargs):
        payload = request.get_json(force=True)
        if 'AUTH_TOKEN' in payload and \
                payload['AUTH_TOKEN'] == app.config['AUTH_TOKEN']:
            return func(*args, **kwargs)
        abort(401)  # Not authorized

    return protect


@app.route('/')
@app.route('/<dashboard>')
def index(dashboard='index'):
    return render_template('index.j2', dashboard_id=dashboard)


@app.route('/dashboard/<dashboard_id>', methods=['POST'])
@protected
def update_dashboard(dashboard_id):
    payload = request.get_json(force=True)
    del payload['AUTH_TOKEN']
    evt_type = payload['event']

    if evt_type == "reload":
        socketio.emit('reload_dashboard', {'dashboard_id': dashboard_id})
        return json.dumps(
            {'success': 'Reloaded dashboard {}'.format(dashboard_id)})
    return json.dumps({'error': 'Nothing to update'})


@app.route('/widget/<widget_id>', methods=['POST'])
@protected
def update_widget(widget_id):
    payload = request.get_json(force=True)
    del payload['AUTH_TOKEN']
    widgets.update_widget(widget_id, payload)
    return json.dumps({'success': True})


@socketio.on('connect')
def socket_connect():
    widgets.init_widgets()


if __name__ == '__main__':
    widgets.read_history()

    sys.path.insert(0, 'jobs')
    registered_jobs = jobs.find_jobs('jobs')

    for job in registered_jobs:
        if not hasattr(job, 'JOB'):
            continue

        scheduler.add_job(job.JOB['func'], **job.JOB['args'])

    scheduler.start()
    socketio.run(app, host='0.0.0.0')
