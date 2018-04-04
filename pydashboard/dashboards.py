from pydashboard.extensions import socketio


class DashboardManager:
    def reload_dashboard(self, id):
        socketio.emit('reload_dashboard', {'dashboard_id': id}, broadcast=True)
