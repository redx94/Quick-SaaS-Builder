
from frontend_generator import FrontendGenerator
from backend_generator import BackendGenerator
from deployment_manager import DeploymentManager

class AGICore:
    def __init__(self):
        self.frontend_gen = FrontendGenerator()
        self.backend_gen = BackendGenerator()
        self.deployment_manager = DeploymentManager()

    def generate_frontend(self, frontend_tasks):
        for task in frontend_tasks:
            print(f"Generating frontend component for task: {task}")
            self.frontend_gen.create_component(task)

    def generate_backend(self, backend_tasks):
        for task in backend_tasks:
            print(f"Generating backend API or model for task: {task}")
            self.backend_gen.create_backend_service(task)

    def deploy_application(self, deployment_tasks):
        for task in deployment_tasks:
            print(f"Handling deployment for task: {task}")
            self.deployment_manager.deploy(task)

if __name__ == "__main__":
    agi_core = AGICore()
    agi_core.generate_frontend(["Create a landing page with a signup form"])
    agi_core.generate_backend(["Set up a REST API for user data management"])
    agi_core.deploy_application(["Deploy to AWS with a PostgreSQL database"])
