# Bookus-Kube

Bookus Kubernetes build files

### Kubernetes Basic

#### Basic Functions

**kubectl get pods**

```
NAME                                   READY   STATUS    RESTARTS   AGE
kubernetes-bootcamp-5b48cfdcbd-86b6d   1/1     Running   0          13s
```

**kubectl get services**

```
NAME         TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
kubernetes   ClusterIP   10.96.0.1    <none>        443/TCP   34s
```

**kubectl expose deployment/kubernetes-bootcamp --type="NodePort" --port 8080**

```
kubernetes            ClusterIP   10.96.0.1      <none>        443/TCP          62s
kubernetes-bootcamp   NodePort    10.98.69.218   <none>        8080:31688/TCP   59s
```

이런식으로 NodePort라는 Service Type을 설정해서 포트 하나를 열 수 있음. 

**kubectl describe services/kubernetes-bootcamp**

```
Name:                     kubernetes-bootcamp
Namespace:                default
Labels:                   run=kubernetes-bootcamp
Annotations:              <none>
Selector:                 run=kubernetes-bootcamp
Type:                     NodePort
IP:                       10.98.69.218
Port:                     <unset>  8080/TCP
TargetPort:               8080/TCP
NodePort:                 <unset>  31688/TCP
Endpoints:                172.18.0.5:8080
Session Affinity:         None
External Traffic Policy:  Cluster
Events:                   <none>
```

export NODE_PORT= \$(kubectl get services/kubernetes-bootcamp -o go-template='{{(index .spec.ports 0).nodePort}}')
echo NODE_PORT=\$NODE_PORT
NODE_PORT=31688

위와 같이 환경 변수를 통해 Port를 외부로 빼낼 수 있음. 

describe 는 get의 상세 출력 버전이라고 봐도 됨.

**kubectl delete service -l run=kubernetes-bootcamp**

위의 명령어를 실행하면 서비스가 삭제됨.

**kubectl exec -ti $POD_NAME curl localhost:8080**

내부에서 실행하는 함수. POD_NAME에는 실제 파드 이름이 들어있음. 이것

#### Labeling

kubectl get services -l run=kubernetes-bootcamp

서비스 중에서 구동되는 것 중에 kubernetes-bootcamp를 가진 놈만 가져올 수 있음.
