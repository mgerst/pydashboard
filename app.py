from flask import Flask, render_template, request, abort
from werkzeug.serving import run_simple

from tornado.wsgi import WSGIContainer
from tornado.web import Application, FallbackHandler
from tornado.websocket import WebSocketHandler
from tornado.ioloop import IOLoop
from functools import wraps
import json
import os

from pydashboard.managers import SocketManager
from pydashboard.dashboards import DashboardManager
from pydashboard import widgets

from flask_webpack import Webpack
webpack = Webpack()
socketManager = SocketManager()
dashboardManager = DashboardManager(socketManager)


class WebSocket(WebSocketHandler):
    def __init__(self, *args, **kwargs):
        super(WebSocket, self).__init__(*args, **kwargs)
        socketManager.add_client(self)

    def open(self):
        print("Socket opened.")
        data = {
            'type': 'UPDATE_WIDGET',
            'payload': {
                'widget_id': 'fall_text',
                'text': 'Test Text',
                'title': 'Test Title',
            },
        }

    def on_message(self, message):
        self.write_message("Received: " + message)
        print("Received message: " + message)

    def on_close(self):
        print("Socket closed.")
        socketManager.remove_client(self)


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

    webpack.init_app(app)

    return app


app = create_app()


def protected(func):
    @wraps(func)
    def protect(*args, **kwargs):
        payload = request.get_json(force=True)
        if 'AUTH_TOKEN' in payload and payload['AUTH_TOKEN'] == app.config['AUTH_TOKEN']:
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
    evt_type = payload['event']

    if evt_type == "reload":
        dashboardManager.reload_dashboard(dashboard_id)
        return json.dumps(
            {'success': 'Reloaded dashboard {}'.format(dashboard_id)})
    return json.dumps({'error': 'Nothing to update'})


@app.route('/widget/<widget_id>', methods=['POST'])
@protected
def update_widget(widget_id):
    payload = request.get_json(force=True)
    widgets.update_widget(widget_id, socketManager, payload)
    return json.dumps({'success': True})

if __name__ == '__main__':
    container = WSGIContainer(app)
    server = Application([
        (r'/ws/', WebSocket),
        (r'.*', FallbackHandler, dict(fallback=container))
    ])
    server.listen(5000)
    IOLoop.instance().start()
