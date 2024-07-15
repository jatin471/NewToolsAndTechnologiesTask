import time
from locust import HttpUser , task , between

class WebsiteUser(HttpUser):
    def __init__(self,parent):
        super(WebsiteUser , self).__init__(parent)
        self.token=""


    wait_time = between(1,5)

    @task
    def on_start(self):
        with self.client.get(url="/login") as response:
            self.token = response.json()["token"]
    
    @task 
    def secret_page(self):
        self.client.get(url="/secret", headers={"authorization": self.token})