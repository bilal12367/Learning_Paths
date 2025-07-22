kubectl apply -f https://raw.githubusercontent.com/mysql/mysql-operator/9.3.0-2.2.4/deploy/deploy-crds.yaml
kubectl apply -f https://raw.githubusercontent.com/mysql/mysql-operator/9.3.0-2.2.4/deploy/deploy-operator.yaml
kubectl create secret generic mypwds \
        --from-literal=rootUser=root \
        --from-literal=rootHost=% \
        --from-literal=rootPassword=root

kubectl apply -f ./mysql_innodb_cluster.yaml


kubectl port-forward pod/mycluster-router-78d98d674-2wwpj 3306:6446