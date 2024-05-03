

# Installation and cluster setup using Kubernetes

>This readme file is a tutorial/guide for proper kubernetes setup
It also helps how to properly install kubernetes and  container runtime "containerd" setup.

> There are three steps involved for successfull kubernetes setup

- [Installation and cluster setup using Kubernetes](#installation-and-cluster-setup-using-kubernetes)
  - [Installing Docker](#installing-docker)
  - [Configuring containerd](#configuring-containerd)
  - [Network Configuration](#network-configuration)
  - [Installing Kubernetes \& development tools](#installing-kubernetes--development-tools)
  - [Forming the cluster](#forming-the-cluster)



## Installing Docker

```bash
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update

sudo apt-get install docker-ce docker-ce-cli docker-buildx-plugin docker-compose-plugin

sudo usermod -aG docker $USER
sudo chown "$USER":"$USER" /home/"$USER"/.docker -R
sudo chmod g+rwx "$HOME/.docker" -R

sudo docker run hello-world

newgrp docker
```

## Configuring containerd
After successfull installation of docker configure the containerd

Run `containerd config default`, this will print out default configuration, copy this.

Run `sudo nano /etc/containerd/config.toml` then comment out the active lines, paste the default configuration.


## Network Configuration

Proper network configuration must be done, before installing the runtime & kubernetes.

```bash
cat << EOF | sudo tee /etc/modules-load.d/containerd.conf
overlay
br_netfilter
EOF
```
```sh
sudo modprobe overlay
sudo modprobe br_netfilter
```

Turn Swap Off
```diff
+ sudo swapoff -a

```
> first enter `sudo nano /etc/fstab` comment out swap line with `#` symbol
> & save the file

enable ipv4 packet forwarding
```sh
cat << EOF | sudo tee /etc/sysctl.d/99-kubernetes-cri.conf
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_forward = 1
net.bridge.bridge-nf-call-ip6tables = 1
    
EOF
sudo sysctl --system
```

After all the necessary network configuration is done. You can continue installing container runtime.

## Installing Kubernetes & development tools

1. Run the following commands

```sh
sudo apt-get update
# apt-transport-https may be a dummy package; if so, you can skip that package
sudo apt-get install -y apt-transport-https ca-certificates curl gpg

curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.30/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.30/deb/ /' | sudo tee /etc/apt/sources.list.d/kubernetes.list
sudo apt-get update
sudo apt-get install -y kubelet kubeadm kubectl
sudo apt-mark hold kubelet kubeadm kubectl
sudo systemctl enable --now kubelet

```
3. check if the kubelet & containerd service is running properly.
```sh
systemctl status kubelet
systemctl status containerd
```

## Forming the cluster

kubeadm init command

```sh
sudo kubeadm init --apiserver-advertise-address=<ip-addr>
```

check if the cluster is up and running

```sh
kubectl get pods
kubectl get svc
```