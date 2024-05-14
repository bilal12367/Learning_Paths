

# Creating mongodb cluster using MongodbCommunity crd.

## Installing the MongodbCommunity CRD.

1. Cloning the repository

```sh
$ git clone https://github.com/mongodb/mongodb-kubernetes-operator.git
```

2. Applying crd manifest
```sh
$ kubectl apply -f config/crd/bases/mongodbcommunity.mongodb.com_mongodbcommunity.yaml
```

3. Verifying crd installed successfully.
```sh
$ kubectl get crd/mongodbcommunity.mongodbcommunity.mongodb.com
NAME                                            CREATED AT
mongodbcommunity.mongodbcommunity.mongodb.com   2024-05-07T06:46:37Z
```
- You should see something like that above
  
4. Create a namespace
```sh
kubectl create ns mongodb
```

5. Adding necessary roles and role-bindings
```sh
kubectl apply -k config/rbac/ --namespace mongodb
```

6. Verifying roles and bindings
```sh
kubectl get role mongodb-kubernetes-operator --namespace mongodb

kubectl get rolebinding mongodb-kubernetes-operator --namespace mongodb

kubectl get serviceaccount mongodb-kubernetes-operator --namespace mongodb
```

7. Installing the operator
```sh
kubectl create -f config/manager/manager.yaml --namespace mongodb
```

8. Verifying the operator installed
```sh
kubectl get pods --namespace mongodb
```

> The installation of MongodbCommunity CRD is done.

## Deploying the mongodb cluster using CRD.

Just apply the yaml file in the following location
> Make sure you change the password in the file

```sh
kubectl apply -f config/samples/mongodb.com_v1_mongodbcommunity_cr.yaml --namespace mongodb
```
