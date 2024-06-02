
kubectl delete -k .
kubectl delete -k ./../nodeapp/

kubectl apply -k .

sleep 20

kubectl cp ./rsinit.js mongo-0:/usr/local/script.js
kubectl exec mongo-0 -- bash -c 'cat /usr/local/script.js | mongosh'

kubectl apply -k ../nodeapp/