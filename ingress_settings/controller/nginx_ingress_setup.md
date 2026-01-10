# NGINX Ingress Controller Setup on AWS

## Prerequisites  
- AWS EKS cluster running  
- `kubectl` and `helm` installed and configured  
- Route 53 hosted zone for your domain  
- AWS ACM for certificate management  

## 1. Install NGINX Ingress Controller  

### Add Helm repository  
```sh
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx  
helm repo update  
```  

### Create values file (ingress-values.yaml)  
```yaml
controller:  
  service:  
    annotations:  
      service.beta.kubernetes.io/aws-load-balancer-type: "nlb"  
      service.beta.kubernetes.io/aws-load-balancer-security-groups: "sg-xxxxxxxx"  
  deployment:  
    progressDeadlineSeconds: 60  
    minReadySeconds: 30  
```  

### Install controller  
```sh
helm install ingress-nginx ingress-nginx/ingress-nginx --namespace ingress-nginx --create-namespace -f ingress-values.yaml 
```  

### Get NLB DNS name  
```sh
kubectl get svc -n ingress-nginx  
```  

## 2. Configure Route 53 DNS  
Create A record in Route 53 pointing to the NLB DNS name obtained above  

## 3. Deploy Ingress Resource  

### Basic ingress (ingress.yaml)  
```yaml
apiVersion: networking.k8s.io/v1  
kind: Ingress  
metadata:  
  name: ingress-frontend  
  namespace: app  
spec:  
  ingressClassName: nginx  
  rules:  
    - host: example.com  
      http:  
        paths:  
          - path: /  
            pathType: Prefix  
            backend:  
              service:  
                name: frontend  
                port:  
                  name: http  
```  

### Apply ingress  
```sh
kubectl apply -f ingress.yaml  
```  

## AWS HTTP to HTTPS Redirect
Please follow to ./aws/route53_nlb/https_redirect.md