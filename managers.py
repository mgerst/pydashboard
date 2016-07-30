import json


class SocketManager(object):
    def __init__(self, *args, **kwargs):
        self.sockets = []

    def add_client(self, socket):
        self.sockets.append(socket)

    def remove_client(self, socket):
        self.sockets.remove(socket)

    def send_message(self, data):
        json_data = json.dumps(data)

        for socket in self.sockets:
            socket.write_message(json_data)
