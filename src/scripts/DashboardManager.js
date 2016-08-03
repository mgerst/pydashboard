class DashboardManager {
  constructor() {
    this._dashboards = new Map();

    this.registerDashboard = this.registerDashboard.bind(this);
    this.getDashboard = this.getDashboard.bind(this);
  }

  registerDashboard(id, component) {
    console.log(`Registered Dashboard: ${id}`);
    this._dashboards.set(id, component);
  }

  getDashboard(id) {
    return this._dashboards.get(id);
  }
}

const dashboardManager = new DashboardManager;
export default dashboardManager;
