import dispatcher from "../dispatcher";
import { EventEmitter } from "events";

class SocketService extends EventEmitter {
  constructor(sock_url) {
    super();
    this._socket = new WebSocket(sock_url);

    this.onMessage = this.onMessage.bind(this);

    this._socket.onmessage = this.onMessage;
    this.widgetData = new Map();
  }

  onMessage(evt) {
    let {data} = evt;
    data = JSON.parse(data);
    console.log(data);
    const { type, payload } = data;

    switch (type) {
      case "UPDATE_WIDGET": {
        console.log("Got widget update");
        const widget_id = payload.widget_id;
        this.widgetData.set(widget_id, payload);
        this.emit(`update_widget-${widget_id}`);
        console.log(`emitted: update_widget-${widget_id}`)
        break;
      }

      case "RELOAD_DASHBOARD": {
        console.log("Got dashboard reload");
        const dashboard_id = payload.dashboard_id;

        if (dashboard_id === '*') {
          this.emit('reload_dashboards');
        } else {
          this.emit(`reload_dashboard-${dashboard_id}`);
        }
        break;
      }

    }
  }

  getWidgetData(id) {
    return this.widgetData.get(id);
  }
}

const socketService = new SocketService("ws://localhost:5000/ws/");
export default socketService;
