curl -1sLf "https://packages.konghq.com/public/gateway-311/gpg.CF9CDA9D288571F9.key" |  gpg --dearmor | sudo tee /usr/share/keyrings/kong-gateway-311-archive-keyring.gpg > /dev/null
curl -1sLf "https://packages.konghq.com/public/gateway-311/config.deb.txt?distro=debian&codename=$(lsb_release -sc)" | sudo tee /etc/apt/sources.list.d/kong-gateway-311.list > /dev/null
sudo apt-get update && sudo apt install -y kong-enterprise-edition=3.11.0.1
