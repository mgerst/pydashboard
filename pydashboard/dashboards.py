from pydashboard.managers import Manager


class DashboardManager(Manager):
    def reload_dashboard(self, id):
        data = {
            'type': 'RELOAD_DASHBOARD',
            'payload': {
                'dashboard_id': id,
            }
        }

        self._sockets.send_message(data)
