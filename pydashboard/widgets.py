import yaml
import json
import os
import time

history = {}
history_file = os.path.join(os.path.dirname(os.path.dirname(__file__)),
                            'history.yml')


def update_widget(id, sockets, payload):
    """
    Send an update the the specified widget.

    :param str id: The widget id to update
    :param SocketManager sockets: The socket manager used by app.py
    :param dict payload: The data to send
    """
    payload.update({
        'widget_id': id,
        'updatedAt': int(time.time()),
    })
    data = {
        'type': 'UPDATE_WIDGET',
        'payload': payload,
    }

    if id in history:
        history[id].update(payload)
    else:
        history[id] = payload
    sockets.send_message(data)
    write_history()


def init_widgets(socket):
    """
    Send the initial data for a widget from the history.

    This function is called for all widgets when a connection is opened. If the
    widget does not exist in history or the current application state, the
    default values provided in the dashboard definition are used.

    :param str id: The widget id to init
    :param WebSocket socket: The raw socket
    :param dict payload: The widget data
    """
    for id, payload in history.items():
        payload.update({'widget_id': id})
        data = {
            # This is technically an "Update" from the default values
            'type': 'UPDATE_WIDGET',
            'payload': payload,
        }
        json_data = json.dumps(data)
        socket.write_message(json_data)


def write_history():
    with open(history_file, 'w') as f:
        f.write(yaml.dump(history, default_flow_style=False))


def read_history():
    if os.path.exists(history_file):
        with open(history_file, 'r') as f:
            history = yaml.load(f)
    else:
        write_history()
