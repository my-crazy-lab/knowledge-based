## Dockerfile chuẩn production

✅
1. Multi-stage build là gì? Tại sao nó lại quan trọng trong tối ưu Docker image?
2. So sánh kích thước và bảo mật giữa image sử dụng multi-stage build và image build truyền thống?  
3. Làm thế nào multi-stage build giúp tách biệt các giai đoạn build và runtime?  
4. Khi nào nên dùng multi-stage build? Có những trường hợp nào multi-stage build không phù hợp?  
5. Cách tổ chức các stage trong Dockerfile sao cho dễ đọc, dễ maintain và tối ưu thời gian build?  
6. Làm thế nào để tái sử dụng cache hiệu quả giữa các stage?  
7. Ảnh hưởng của multi-stage build đến thời gian build và deploy? Làm sao cân bằng giữa tối ưu size và tốc độ build?  
8. Các best practice trong việc đặt tên stage và truyền dữ liệu (`COPY --from`) giữa các stage?  
9. Làm thế nào để kiểm soát những file và thư viện nào được copy từ stage build sang stage runtime để giảm thiểu rủi ro bảo mật?  
10. Cách kiểm soát và test image cuối cùng xem có chứa những thành phần không cần thiết hay lỗ hổng bảo mật?  
11. So sánh multi-stage build với các phương pháp tối ưu image khác như slimming tools (docker-slim), alpine base image, hoặc distroless image?  
12. Làm sao để debug các stage trong multi-stage build khi xảy ra lỗi build?  
13. Có thể tích hợp multi-stage build với CI/CD pipeline như thế nào để tối ưu build cache và tăng tốc deploy?  
14. Tác động của multi-stage build đến việc quản lý dependency trong ứng dụng?  
15. Làm thế nào để bảo đảm rằng các stage cuối cùng không chứa secret hoặc thông tin nhạy cảm được sử dụng trong quá trình build?  

✅
2. So sánh các loại healthcheck: livenessProbe, readinessProbe trong Kubernetes? Khi nào dùng mỗi loại?  
3. Cách định nghĩa healthcheck trong Dockerfile (lệnh `HEALTHCHECK`), các tham số phổ biến như `interval`, `timeout`, `retries` có ý nghĩa gì?  
4. Healthcheck nên kiểm tra những gì? (ví dụ: response của app, database connection, các service phụ trợ...)  
5. Làm thế nào healthcheck giúp orchestrator tự động xử lý restart hoặc chuyển traffic khi container gặp lỗi?  
6. Thế nào là healthcheck false positive và false negative? Cách giảm thiểu các trường hợp này?  
7. Khi nào nên để healthcheck ở mức đơn giản (ping port, HTTP status) và khi nào cần healthcheck phức tạp hơn?  
8. Ảnh hưởng của healthcheck đến hiệu suất container và mạng lưới microservices?  
9. Cách test và debug healthcheck khi triển khai thực tế?  
10. Tích hợp healthcheck với hệ thống monitoring, alerting để phát hiện sự cố nhanh chóng?  
11. Các rủi ro khi không có hoặc thiết kế healthcheck kém? Ví dụ downtime lâu, mất cân bằng tải...  
12. So sánh healthcheck trên Docker và orchestrator (K8s, ECS): ưu điểm và hạn chế?  
13. Làm thế nào để thiết kế healthcheck phù hợp với kiến trúc microservices, có nhiều service phụ thuộc nhau?  
14. Các best practice bảo mật khi triển khai healthcheck (tránh leak thông tin nhạy cảm qua endpoint health)?  
15. Cách tích hợp healthcheck vào CI/CD pipeline để tự động kiểm tra trạng thái ứng dụng sau deploy?  

1. Các tiêu chí quan trọng khi lựa chọn base image cho container là gì?
2. So sánh ưu nhược điểm giữa các base image phổ biến như Alpine, Debian, Ubuntu, Distroless. Khi nào nên dùng từng loại?  
3. Base image ảnh hưởng thế nào đến kích thước, thời gian build và khởi chạy container?  
4. Làm thế nào để đánh giá mức độ bảo mật và patch của base image?  
5. Distroless image là gì? Nó khác gì so với Alpine hay minimal images truyền thống?  
6. Khi nào không nên dùng base image quá nhỏ hoặc minimal (ví dụ Alpine) vì lý do compatibility hoặc debugging?  
7. Làm thế nào để quản lý vulnerability của base image trong pipeline CI/CD? (Ví dụ scan image với Trivy, Clair, Anchore...)  
8. Quản lý version base image thế nào để balance giữa cập nhật bảo mật và ổn định hệ thống?  
9. Các best practice để giảm attack surface khi chọn và sử dụng base image?  
10. Làm thế nào để customize base image mà vẫn giữ được tính nhẹ và bảo mật?  
11. Cách theo dõi và cập nhật base image khi có bản vá bảo mật mới?  
12. So sánh ảnh hưởng của base image đến runtime performance và resource consumption?  
13. Làm thế nào để test base image trước khi sử dụng trong production?  
14. Ảnh hưởng của base image đến khả năng debug khi container gặp sự cố?  
15. Các lưu ý khi tích hợp base image vào multi-stage build để tối ưu kích thước cuối cùng?  

1. Tại sao việc loại bỏ các package/tool không cần thiết lại quan trọng trong thiết kế Docker Image?  
2. Những package/tool nào thường bị quên loại bỏ nhưng lại tiềm ẩn rủi ro bảo mật?  
3. Làm thế nào để xác định package/tool nào cần giữ lại và package/tool nào có thể loại bỏ?  
4. Các kỹ thuật hoặc công cụ hỗ trợ quét và đánh giá package trong image để phát hiện thành phần thừa thãi?  
5. So sánh cách tiếp cận “minimal base image” và “customized image” trong việc giảm thiểu package không cần thiết?  
6. Tác động của việc giữ lại các package/tool thừa thãi đến kích thước image và thời gian build, deploy?  
7. Cách cấu hình Dockerfile để loại bỏ package sau khi cài đặt (ví dụ: dùng multi-stage build, cleanup trong RUN commands)?  
8. Làm sao để cân bằng giữa việc loại bỏ tool không cần thiết và nhu cầu debugging/giám sát container?  
9. Tác động của việc giữ lại hoặc loại bỏ package đến khả năng bảo trì và cập nhật image sau này?  
10. Các best practice về audit và review Dockerfile để đảm bảo không có package/tool dư thừa?  
11. Làm thế nào để tích hợp bước loại bỏ package/tool vào pipeline CI/CD tự động?  
12. Ví dụ thực tế về các cuộc tấn công khai thác lỗ hổng do giữ lại các package/tool không cần thiết?  
13. Kinh nghiệm xử lý các trường hợp dependency phức tạp khi loại bỏ package/tool?  
14. So sánh hiệu quả giữa việc loại bỏ package/tool ở image level với sử dụng container security scanning tools?  
15. Các tiêu chí đánh giá rủi ro bảo mật khi quyết định giữ lại hay loại bỏ một package/tool?  

## Không hard-code secrets trong Dockerfile hoặc image
1. Tại sao việc hard-code secrets trong Dockerfile hoặc image lại là rủi ro bảo mật nghiêm trọng?  
2. Những phương pháp nào phổ biến để quản lý secrets khi deploy container?  
3. So sánh ưu nhược điểm giữa việc sử dụng environment variables, Docker secrets, và external secret managers (HashiCorp Vault, AWS SSM, Azure Key Vault).  
4. Làm sao để tích hợp secret management trong pipeline CI/CD một cách an toàn?  
5. Cách xử lý khi cần secrets ở thời điểm build (build-time secrets) mà không để lại dấu vết trong image cuối cùng?  
6. Cách audit và phát hiện secrets bị lộ trong các image đã build?  

## Thiết lập user không phải root để chạy container
1. Tại sao chạy container với user root lại là một vấn đề bảo mật?  
2. Cách thiết lập user không phải root trong Dockerfile (USER directive), và các lưu ý khi cấp quyền?  
3. Làm thế nào để đảm bảo ứng dụng trong container vẫn chạy ổn định với user không phải root?  
4. Những vấn đề có thể gặp khi chuyển container sang user không root và cách khắc phục?  
5. Best practices cho quản lý quyền và file permissions trong container để tăng bảo mật?  

## Quản lý và tối ưu cache layer để tăng tốc độ build và deploy
1. Docker cache layer hoạt động như thế nào trong quá trình build?  
2. Làm sao để thiết kế Dockerfile để tận dụng tối đa cache, tránh rebuild không cần thiết?  
3. Cách sắp xếp các bước trong Dockerfile để tăng hiệu quả cache?  
4. Khi nào cần phải clear cache và cách làm?  
5. Tác động của việc sử dụng cache đến security (ví dụ cache có thể giữ lại thông tin nhạy cảm)?  
6. Kỹ thuật multi-stage build có giúp tối ưu cache và image size ra sao?  
7. Cách tích hợp caching layer trong pipeline CI/CD để tăng tốc build?  
8. Các công cụ hoặc phương pháp hỗ trợ phân tích và tối ưu cache trong Docker builds?  

## Secret Management

## Không lưu secrets trong repo, config file hay env variables plain text
1. Tại sao lưu secrets dưới dạng plain text trong repo hoặc config file là rủi ro bảo mật?  
2. Những trường hợp nào vẫn thường khiến secrets bị lộ dù đã có quy trình bảo mật?  
3. Làm thế nào để phát hiện và xử lý khi secrets bị commit nhầm vào repository?  
4. So sánh các phương pháp tránh lưu secrets plain text: environment variables, encrypted files, secret managers.  

## Sử dụng các giải pháp quản lý secret: GitHub Secrets, AWS SSM Parameter Store, HashiCorp Vault
1. Ưu và nhược điểm của các công cụ quản lý secret phổ biến (GitHub Secrets, AWS SSM, Vault) là gì?  
2. Cách tích hợp các secret manager này vào pipeline CI/CD và runtime environment?  
3. Cách đồng bộ và version hóa secrets khi sử dụng các giải pháp này?  
4. Làm sao để thiết lập quyền truy cập chính xác (RBAC) và audit khi sử dụng các secret manager?  
5. Cách xử lý secret rotation tự động và không làm gián đoạn dịch vụ?  

## Thiết kế luồng truy cập secret an toàn, hạn chế scope và quyền truy cập
1. Thiết kế luồng truy cập secret như thế nào để tuân thủ nguyên tắc least privilege?  
2. Làm thế nào để phân quyền chi tiết cho từng thành phần hệ thống khi truy cập secret?  
3. Cách bảo vệ luồng truy cập secret khỏi các cuộc tấn công MITM hoặc leak trong hệ thống mạng?  
4. Khi nào nên cache secret trên runtime và cách bảo vệ cache đó?  
5. Phương pháp để audit và giám sát việc truy cập secret trong hệ thống?  
6. Làm sao thiết kế fallback mechanism nếu secret manager gặp sự cố?  

## Cơ chế rotate secret tự động, audit truy cập và thay thế secret khi bị nghi ngờ
1. Quy trình tự động rotate secret diễn ra như thế nào trong hệ thống hiện tại?  
2. Làm thế nào để đồng bộ secret rotation với các service đang sử dụng secret đó mà không gây downtime?  
3. Các công cụ hoặc framework nào hỗ trợ secret rotation hiệu quả?  
4. Tiêu chí để xác định khi nào cần rotate secret (ví dụ: theo lịch, khi nghi ngờ bị lộ, sau sự cố bảo mật)?  
5. Cách audit và ghi nhận lịch sử truy cập, thay đổi secret để phục vụ điều tra và compliance?  
6. Làm sao để phát hiện và phản ứng kịp thời khi có dấu hiệu secret bị lộ hoặc truy cập trái phép?  

## Xác thực và phân quyền truy cập vào hệ thống secret (RBAC, IAM policies)
1. Thiết kế mô hình phân quyền (RBAC/IAM) cho hệ thống secret như thế nào để đảm bảo nguyên tắc least privilege?  
2. Làm thế nào để tích hợp xác thực đa yếu tố (MFA) hoặc các phương thức xác thực nâng cao cho truy cập secret?  
3. Cách quản lý và kiểm soát quyền truy cập động khi thay đổi nhân sự hoặc vai trò trong tổ chức?  
4. Làm thế nào để audit và kiểm tra chính sách phân quyền đang áp dụng có tuân thủ và không gây rủi ro?  

## Đảm bảo encrypted secret khi truyền tải và lưu trữ
1. Các phương pháp mã hóa secret tại rest và in transit phổ biến và được áp dụng thế nào?  
2. Làm thế nào để đảm bảo key management cho việc mã hóa secret được an toàn và hiệu quả?  
3. Kiểm tra các điểm yếu tiềm năng trong quá trình truyền tải và lưu trữ secret, cách khắc phục?  
4. Giải pháp bảo vệ secret khỏi việc bị truy cập hoặc sửa đổi khi đang ở trạng thái lưu trữ?  

## Giám sát và cảnh báo khi có hoạt động bất thường liên quan đến secret
1. Các chỉ số, logs hoặc events nào cần theo dõi để phát hiện hoạt động truy cập secret bất thường?  
2. Thiết lập hệ thống cảnh báo thế nào để có thể phản ứng nhanh khi phát hiện vi phạm liên quan đến secret?  
3. Kịch bản xử lý khi có cảnh báo về truy cập hoặc lạm dụng secret?  
4. Làm sao tích hợp giám sát truy cập secret với hệ thống SIEM hoặc các giải pháp bảo mật tổng thể?  

## CD Pipeline & Auto Deploy

## Tự động build, test và deploy cho mỗi feature branch lên môi trường dev/staging
1. Làm thế nào để thiết kế pipeline CI/CD để tự động build và deploy feature branch một cách hiệu quả mà không gây ảnh hưởng môi trường chính?  
2. Các kỹ thuật để song song hóa pipeline, giảm thời gian build và deploy cho nhiều feature branch?  
3. Cách tích hợp các bước test tự động (unit, integration, e2e) trong pipeline để đảm bảo chất lượng trước deploy?  
4. Làm sao đảm bảo rollback nhanh và an toàn khi deploy feature branch gặp sự cố?  
5. Cách xử lý xung đột khi nhiều feature branch deploy lên cùng môi trường dev/staging?  

## Kiểm tra image sau build: scanning vulnerability, lint, compliance
1. Những công cụ nào hiệu quả cho việc scan vulnerability và lint Docker images trong pipeline?  
2. Quy trình tích hợp scanning vào pipeline sao cho không làm chậm quá trình deploy nhưng vẫn đảm bảo an toàn?  
3. Làm thế nào để tự động chặn deploy khi phát hiện vulnerabilities nghiêm trọng?  
4. Cách cập nhật định nghĩa policies compliance để phù hợp với quy chuẩn bảo mật của tổ chức?  
5. Định nghĩa tiêu chí “đạt chuẩn” image để đảm bảo tính ổn định và bảo mật?  

## Xử lý rollback khi deploy thất bại hoặc phát hiện lỗi
1. Làm sao để thiết kế pipeline có khả năng rollback tự động hoặc thủ công nhanh chóng và an toàn?  
2. Các chiến lược rollback phổ biến (blue-green, canary, recreate) và ưu/nhược điểm khi áp dụng?  
3. Cách đồng bộ trạng thái ứng dụng, database khi rollback để tránh inconsistency?  
4. Giám sát và alert thế nào để kịp thời phát hiện deploy lỗi và kích hoạt rollback?  
5. Làm thế nào để kiểm tra và test kịch bản rollback trong môi trường staging hoặc testing?  

## Quản lý tag image rõ ràng, không dùng latest trong production
1. Chiến lược tagging image nào giúp quản lý phiên bản rõ ràng, dễ theo dõi và rollback?  
2. Làm thế nào để tích hợp tagging tự động dựa trên commit hash, branch name, hoặc versioning scheme?  
3. Các rủi ro khi sử dụng tag `latest` trong production và cách phòng tránh?  
4. Cách quản lý registry để tránh tồn đọng nhiều image không dùng, giảm chi phí lưu trữ?  
5. Làm sao để đảm bảo image được sử dụng trong production luôn tương ứng với code đã review và test?  

## Đảm bảo pipeline có thể mở rộng, dễ bảo trì và có logging chi tiết
1. Làm thế nào để thiết kế pipeline modular, reusable, và dễ mở rộng khi dự án phát triển?  
2. Các kỹ thuật quản lý cấu hình pipeline (pipeline as code) giúp duy trì sự nhất quán và dễ thay đổi?  
3. Cách xây dựng logging chi tiết trong pipeline để dễ dàng audit và debug khi có sự cố?  
4. Làm sao để áp dụng version control cho pipeline script và cấu hình deployment?  
5. Các framework hoặc công cụ hỗ trợ quản lý pipeline lớn, phức tạp (ví dụ Jenkinsfile libraries, GitHub Actions reusable workflows)?  

## Tích hợp alert và monitoring cho pipeline để phát hiện sớm lỗi
1. Các loại alert cần thiết cho pipeline (build failure, test fail, deploy error, timeout)?  
2. Làm thế nào để tích hợp alert qua Slack, email, PagerDuty, hoặc các công cụ Ops?  
3. Giám sát hiệu suất pipeline như thời gian chạy, tỷ lệ thành công, và tài nguyên sử dụng?  
4. Cách thu thập và phân tích log pipeline để dự báo lỗi tiềm ẩn và bottleneck?  
5. Kịch bản xử lý sự cố nhanh khi pipeline gặp lỗi nghiêm trọng (incident response plan)?  

## Đồng bộ cấu hình môi trường giữa dev, staging và production (Infrastructure as Code)
1. Các công cụ IaC phổ biến và ưu nhược điểm (Terraform, CloudFormation, Pulumi, Ansible)?  
2. Làm sao để quản lý cấu hình environment (secrets, variables, resource sizing) một cách nhất quán?  
3. Cách tổ chức repository IaC và pipeline deploy để đảm bảo thay đổi hạ tầng được kiểm soát tốt?  
4. Quy trình test và validate cấu hình IaC trước khi deploy lên production?  
5. Thực hành rollback hoặc rollback tự động cho thay đổi hạ tầng khi phát hiện lỗi?  
6. Cách đồng bộ và audit logs thay đổi cấu hình hạ tầng để đảm bảo tuân thủ và truy xuất nguồn gốc?  

## Performance & Security Best Practices
- Thiết kế image tối ưu để giảm thời gian khởi động container (fast startup)
- Quản lý tài nguyên container (CPU, Memory) hợp lý trong pipeline
- Bảo mật pipeline: giới hạn quyền truy cập, audit logs pipeline actions
- Kiểm tra và cập nhật thường xuyên các base image và toolchain để vá lỗ hổng

# Câu hỏi đào sâu cho Technical Lead

### 1. Làm thế nào để tối ưu Dockerfile multi-stage build cho ứng dụng của mình?  
- Các bước cần tách rõ trong các stage để giảm kích thước cuối cùng của image?  
- Làm thế nào để tận dụng cache layer hiệu quả trong multi-stage build?  
- Cách xử lý dependency và build tools sao cho không bị thừa trong final image?  
- Các kỹ thuật giảm thiểu size image khác (minify, xoá file tạm, multi-arch build)?  
- Làm thế nào để cân bằng giữa tính dễ maintain và tối ưu build?  

### 2. Tại sao healthcheck quan trọng? Mình nên định nghĩa healthcheck thế nào cho phù hợp?  
- Healthcheck giúp orchestrator (K8s, ECS) ra quyết định gì về lifecycle container?  
- Nên kiểm tra health dựa trên endpoint nào: HTTP status, TCP port, hay command shell?  
- Làm sao để healthcheck phản ánh đúng trạng thái “sẵn sàng phục vụ” của app?  
- Tần suất và timeout phù hợp cho healthcheck?  
- Kịch bản xử lý khi healthcheck fail liên tục (restart, alert, circuit breaker)?  

### 3. Các base image phổ biến và ưu nhược điểm của chúng? Khi nào nên dùng distroless?  
- So sánh giữa Alpine, Debian/Ubuntu, BusyBox, Distroless về kích thước, bảo mật, và tiện lợi?  
- Tại sao Alpine nhẹ nhưng có thể gặp vấn đề tương thích?  
- Distroless là gì, và khi nào nên dùng distroless để tăng bảo mật?  
- Làm sao để cập nhật và patch base image đúng cách để tránh lỗ hổng bảo mật?  
- Ảnh hưởng của base image đến tốc độ build và deploy trong pipeline?  

### 1. So sánh giữa các công cụ secret management (GitHub Secrets vs AWS SSM vs HashiCorp Vault)  
- Mức độ bảo mật và cơ chế mã hóa secrets của từng công cụ như thế nào?  
- Khả năng tích hợp và phạm vi sử dụng (GitHub Actions, AWS services, multi-cloud) ra sao?  
- Cơ chế quản lý lifecycle của secret: tạo mới, rotate, revoke?  
- Hỗ trợ audit, logging và alert khi có truy cập hoặc thay đổi secret?  
- Cách phân quyền và kiểm soát truy cập (RBAC, IAM policies) trong từng hệ thống?  
- Chi phí và độ phức tạp khi triển khai, vận hành ở quy mô lớn?  

### 2. Pipeline cần những bước kiểm tra, bảo vệ nào trước khi deploy vào dev/staging?  
- Kiểm tra code quality, unit/integration test, và security scanning (vulnerability, secret detection)?  
- Xác minh image Docker: scan vulnerabilities, lint, compliance với chính sách bảo mật?  
- Thiết lập approval gate hoặc manual review nếu cần thiết cho các bước deploy?  
- Cách xử lý biến môi trường, secret trong pipeline sao cho an toàn?  
- Thực thi healthcheck và smoke test sau deploy tự động?  
- Cơ chế retry, timeout và rollback tự động khi phát hiện lỗi?  

### 3. Làm sao đảm bảo rollback nhanh chóng và an toàn khi deploy thất bại?  
- Thiết kế pipeline có checkpoint (versioned artifacts, immutable images) để quay về phiên bản trước?  
- Cách lưu trữ và quản lý state/config để tránh mất đồng bộ khi rollback?  
- Kịch bản rollback cho database migration hoặc schema changes?  
- Tích hợp monitoring và alert để phát hiện deploy thất bại sớm và kích hoạt rollback?  
- Thử nghiệm quy trình rollback định kỳ để đảm bảo sẵn sàng?  

### 4. Cách nào để audit và rotate secrets hiệu quả mà không gián đoạn deploy?  
- Làm thế nào để thiết kế luồng rotate secret không làm gián đoạn service (zero downtime rotation)?  
- Các kỹ thuật đồng bộ secret giữa các môi trường và service như thế nào?  
- Hệ thống audit logging truy cập và thay đổi secret được triển khai ra sao?  
- Cách xử lý fallback khi secret mới chưa được propagate kịp thời?  
- Tự động hóa rotation bằng workflow hoặc trigger event từ hệ thống quản lý secret?  

### 5. Quản lý tag image thế nào để tránh nhầm lẫn và lỗi version?  
- Quy ước đặt tên tag image (semantic versioning, git commit hash, timestamp) hiệu quả?  
- Sử dụng tag immutability để tránh ghi đè image cũ?  
- Chiến lược cleanup và giữ lại các tag/image cũ phù hợp?  
- Tích hợp tag image với pipeline deploy để đảm bảo đồng bộ version?  
- Cách xử lý các trường hợp rollback dựa trên tag?  

### 6. Các chỉ số nào nên monitor trong pipeline để kịp thời phát hiện sự cố?  
- Thời gian build, test, deploy trung bình và đột biến?  
- Tỷ lệ thất bại build, test và deploy?  
- Tần suất và nguyên nhân rollback?  
- Resource usage của runner/agent (CPU, Memory, Disk)?  
- Các cảnh báo bảo mật như phát hiện secrets trong code hoặc hình ảnh?  
- Log chi tiết từng bước pipeline để phục vụ điều tra khi có sự cố?  

### 7. Làm thế nào để bảo mật pipeline CI/CD trước các cuộc tấn công từ bên ngoài?  
- Cơ chế xác thực và phân quyền truy cập pipeline (OAuth, token, RBAC)?  
- Bảo vệ secret trong pipeline khỏi lộ thông tin (masking, encryption)?  
- Giới hạn quyền chạy pipeline với các branch, fork hoặc contributor không tin cậy?  
- Kiểm soát nguồn input (artifact, dependency) tránh lây nhiễm mã độc?  
- Cập nhật, patch thường xuyên các thành phần pipeline để tránh lỗ hổng?  
- Audit và log đầy đủ các hoạt động pipeline để theo dõi và điều tra?  

### 8. Khi nào nên tách pipeline deploy riêng cho production so với dev/staging?  
- Tiêu chí nào để quyết định tách pipeline theo môi trường (rủi ro, tần suất deploy, quy trình phê duyệt)?  
- Lợi ích và nhược điểm của việc dùng pipeline chung vs pipeline riêng cho production?  
- Làm sao để đồng bộ cấu hình và bước deploy giữa các pipeline tránh sai lệch?  
- Cách đảm bảo kiểm soát nghiêm ngặt các thay đổi được deploy lên production (approval, manual gate)?  
- Quản lý rollback và hotfix khi có pipeline riêng cho production?  

### 9. Cách xử lý secret khi cần debug và troubleshooting trong pipeline?  
- Quy trình để truy cập tạm thời secret cho mục đích debug mà không làm lộ thông tin?  
- Sử dụng các công cụ hoặc kỹ thuật gì để audit và kiểm soát việc truy cập secret khi debug?  
- Làm sao để giữ bí mật khi log pipeline, tránh ghi nhầm secret vào log?  
- Quy trình revoke hoặc rotate secret sau khi debug hoàn tất?  
- Thực hành tốt nhất khi debug pipeline có liên quan đến secret và môi trường bảo mật?  

### 10. Các bài học, sai sót phổ biến khi xây dựng pipeline auto deploy cho feature branch?  
- Thiếu kiểm soát quyền truy cập làm lộ secret hoặc deploy nhầm môi trường?  
- Không quản lý version image/tag rõ ràng dẫn đến deploy sai code?  
- Pipeline quá phức tạp, khó bảo trì hoặc thiếu logging/alert khi lỗi?  
- Thiếu rollback tự động hoặc manual làm downtime kéo dài?  
- Không tách biệt môi trường, deploy thẳng lên production từ feature branch?  
- Quá tin tưởng vào test tự động mà bỏ qua kiểm tra thủ công cần thiết?  
