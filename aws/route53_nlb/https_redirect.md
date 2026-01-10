### Load Balancer HTTP to HTTPS Redirect
To configure your Application Load Balancer (ALB) to redirect HTTP to HTTPS:

## Prerequisites
- AWS EKS cluster running
- `kubectl` and `helm` installed and configured
- Route 53 hosted zone for your domain
- AWS ACM for certificate management

1. Open the Amazon EC2 console
2. Navigate to Load Balancers
3. Select your load balancer
4. Go to the "Listeners" tab
5. For the HTTP listener (port 80), choose "View/edit rules"
6. Click the pencil icon to edit rules
7. Delete existing rules if present
8. Add new rule with:
   - Condition: Path is /*
   - Action: Redirect to HTTPS (port 443)
9. Save the rules

### Security Group Configuration
Ensure your security groups allow:
- Inbound traffic on port 443 (HTTPS) from 0.0.0.0/0
- Inbound traffic on port 80 (HTTP) from 0.0.0.0/0 (for redirect)
- Outbound traffic to your worker nodes on necessary ports