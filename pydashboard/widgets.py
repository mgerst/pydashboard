def update_widget(id, sockets, payload):
    payload.update({'widget_id': id})
    data = {
        'type': 'UPDATE_WIDGET',
        'payload': payload,
    }

    sockets.send_message(data)
