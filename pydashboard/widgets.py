import os
import time

import yaml

from pydashboard.extensions import socketio

history = {}
history_file = os.path.join(os.path.dirname(os.path.dirname(__file__)),
                            'history.yml')


def update_widget(id, payload):
    """
    Send an update the the specified widget.

    :param str id: The widget id to update
    :param dict payload: The data to send
    """
    payload.update({
        'widget_id': id,
        'updatedAt': int(time.time()),
    })

    if id in history:
        history[id].update(payload)
    else:
        history[id] = payload
    socketio.emit('update_widget', payload, broadcast=True)
    write_history()


def init_widgets():
    """
    Send the initial data for a widget from the history.

    This function is called for all widgets when a connection is opened. If the
    widget does not exist in history or the current application state, the
    default values provided in the dashboard definition are used.
    """
    print("Sending initial widget status")
    for id, payload in history.items():
        payload.update({'widget_id': id})
        socketio.emit('update_widget', payload)


def write_history():
    with open(history_file, 'w') as f:
        f.write(yaml.dump(history, default_flow_style=False))


def read_history():
    if os.path.exists(history_file):
        with open(history_file, 'r') as f:
            history = yaml.load(f)
    else:
        write_history()
