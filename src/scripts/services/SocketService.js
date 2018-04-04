import {EventEmitter} from "events";
import io from 'socket.io-client';

class SocketService extends EventEmitter {
    constructor(sock_url) {
        super();
        this._socket = new io(sock_url);

        this.onUpdateWidget = this.onUpdateWidget.bind(this);
        this.onReloadDashboard = this.onReloadDashboard.bind(this);

        this._socket.on('update_widget', this.onUpdateWidget);
        this._socket.on('reload_dashboard', this.onReloadDashboard);
        this.widgetData = new Map();
    }

    onUpdateWidget(data) {
        const widget_id = data.widget_id;
        console.log(`Got update widget ${widget_id}`);
        console.log('Update data', data);
        this.widgetData.set(widget_id, data);
        this.emit(`update_widget-${widget_id}`)
    }

    onReloadDashboard(data) {
        const dashboard_id = data.dashboard_id;

        if (dashboard_id === '*') {
            this.emit('reload_dashboards');
        } else {
            this.emit(`reload_dashboard-${dashboard_id}`);
        }
    }

    getWidgetData(id) {
        return this.widgetData.get(id);
    }
}

const url = `${location.protocol}//${document.domain}:${location.port}`
const socketService = new SocketService(url);
console.log(`Loading WS ${url} - ${socketService}`);
export default socketService;
