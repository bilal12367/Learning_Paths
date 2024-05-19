
sudo kubeadm reset && sudo rm -r /etc/kubernetes/*

sudo rm -r $HOME/.kube

./master.sh

echo ============================== Join Command ==============================
sudo kubeadm token create --print-join-command
echo ============================== Join Command ==============================

