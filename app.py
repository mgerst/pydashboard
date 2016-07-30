from flask import Flask, render_template, request
from werkzeug.serving import run_simple

from tornado.wsgi import WSGIContainer
from tornado.web import Application, FallbackHandler
from tornado.websocket import WebSocketHandler
from tornado.ioloop import IOLoop
import json

from managers import SocketManager

from flask_webpack import Webpack
webpack = Webpack()
socketManager = SocketManager()


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

    if settings_override:
        app.config.update(settings_override)

    webpack.init_app(app)

    return app


app = create_app()


@app.route('/')
def index():
    return render_template('index.j2')


@app.route('/widget/<widget_id>', methods=['POST'])
def update_widget(widget_id):
    payload = request.get_json(force=True)
    payload.update({
        'widget_id': widget_id
    })

    data = {
        'type': 'UPDATE_WIDGET',
        'payload': payload,
    }

    socketManager.send_message(data)

    return json.dumps({'success': True})

if __name__ == '__main__':
    # run_simple('localhost', 5000, app, use_reloader=True, use_debugger=True)
    container = WSGIContainer(app)
    server = Application([
        (r'/ws/', WebSocket),
        (r'.*', FallbackHandler, dict(fallback=container))
    ])
    server.listen(5000)
    IOLoop.instance().start()
