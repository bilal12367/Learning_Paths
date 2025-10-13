

gnome-terminal -- bash -c "cd auth_service && npm start; exec bash"
gnome-terminal -- bash -c "cd email_service && npm start; exec bash"
gnome-terminal -- bash -c "cd background_task_service/background_processor && mvn spring-boot:run; exec bash"
gnome-terminal -- bash -c "cd websocket_service && mvn spring-boot:run; exec bash"



