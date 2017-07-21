import pkgutil
from importlib import import_module


def find_jobs(job_dir):
    """
    Given a path to a jobs directory, loads the jobs contained in that
    directory.

    Based on Django's management commands
    """
    jobs = [name for _, name, is_pkg in pkgutil.iter_modules([job_dir])
            if not is_pkg and not name.startswith('_')]

    job_mods = []

    for job in jobs:
        job_mods.append(import_module(job))

    return job_mods
