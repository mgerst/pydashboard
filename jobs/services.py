from app import scheduler, socketManager
from pydashboard import widgets
import random


current_up = current_partial = current_down = 0
last_up = last_partial = last_down = 0
print("Loaded Services Job")


@scheduler.scheduled_job(trigger='interval', seconds=30)
def poll_services():
    global current_up, current_partial, current_down
    global last_up, last_partial, last_down

    # Update History
    last_up = current_up
    last_partial = current_partial
    last_down = current_down

    current_up = random.randint(0, 50)
    current_partial = random.randint(0, 50)
    current_down = random.randint(0, 50)

    # Update Widgets
    widgets.update_widget('services_up', socketManager, {
        'current': current_up, 'last': last_up,
    })
    widgets.update_widget('services_partial', socketManager, {
        'current': current_partial, 'last': last_partial,
    })
    widgets.update_widget('services_down', socketManager, {
        'current': current_down, 'last': last_down,
    })
