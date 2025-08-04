# ✅ Câu hỏi đào sâu về Thiết kế resource URL hợp lý (Level Principle)

1. Nguyên tắc cơ bản nào định nghĩa một resource trong REST API?
2. Làm thế nào để phân biệt giữa resource và hành động (action) trong thiết kế URL?
3. Tại sao nên tránh dùng động từ (verbs) trong URL và thay vào đó tập trung vào danh từ (nouns)?
4. Quy ước đặt tên resource URL nên theo chuẩn nào (snake_case, kebab-case, camelCase)? Ưu nhược điểm của từng loại là gì?
5. Làm sao để thiết kế URL thể hiện mối quan hệ cha-con (nested resources) một cách hợp lý mà không gây phức tạp quá mức?
6. Khi nào nên dùng nested resource và khi nào nên dùng query parameters để biểu diễn quan hệ hoặc lọc dữ liệu?
7. Làm thế nào để thiết kế URL sao cho dễ dàng mở rộng khi API phát triển thêm các tính năng mới?
8. Có nên dùng số ID hay slug (human-readable string) trong URL? Ưu và nhược điểm của mỗi cách?
9. Làm sao để xử lý trường hợp resource có nhiều định dạng (ví dụ JSON, XML) trong URL hoặc Header?
10. Làm thế nào để đảm bảo URL dễ đọc, dễ nhớ và thân thiện với người dùng cũng như các developer sử dụng API?
11. Tác động của thiết kế URL đến khả năng caching, logging và phân tích truy cập như thế nào?
12. Làm sao để thiết kế URL chuẩn REST phù hợp với các hệ thống phân tán, microservices và proxy?
13. Có những tiêu chuẩn hoặc best practices nổi bật nào trong thiết kế resource URL mà các hệ thống lớn thường áp dụng?
14. Làm thế nào để thiết kế URL sao cho dễ dàng hỗ trợ các thao tác pagination, filtering, sorting mà vẫn giữ cấu trúc rõ ràng?
15. Khi thiết kế URL, làm sao để cân bằng giữa tính chuẩn REST và tính thực tế, hiệu quả trong phát triển và bảo trì?

# ✅ Câu hỏi đào sâu về Sử dụng status code đúng chuẩn (Level Principle)

1. Tại sao việc sử dụng status code HTTP đúng chuẩn lại quan trọng trong thiết kế REST API?
2. HTTP status code được phân loại thành các nhóm nào? Ý nghĩa và vai trò của từng nhóm trong API là gì?
3. Khi nào nên dùng status code 200 (OK) so với 201 (Created) hoặc 204 (No Content)? Ví dụ cụ thể từng trường hợp.
4. Làm thế nào để chọn status code phù hợp cho các trường hợp lỗi phổ biến như:  
   - 400 Bad Request  
   - 401 Unauthorized  
   - 403 Forbidden  
   - 404 Not Found  
   - 409 Conflict  
   - 422 Unprocessable Entity  
   - 500 Internal Server Error
5. Trong trường hợp lỗi, ngoài status code, cần cung cấp thêm thông tin gì trong response body để client hiểu và xử lý được?
6. Có nên sử dụng status code tùy chỉnh (custom status codes) không? Ưu nhược điểm của việc này là gì?
7. Làm sao để thiết kế flow xử lý lỗi sao cho nhất quán giữa các endpoint và dễ bảo trì?
8. Cách xử lý các trạng thái chuyển hướng (3xx) trong REST API có gì đặc biệt so với website truyền thống?
9. Làm thế nào để status code giúp tối ưu caching, retry và idempotency trong REST API?
10. Khi API phải tương tác với nhiều dịch vụ backend, làm sao đảm bảo status code trả về vẫn rõ ràng và dễ hiểu?
11. Có nên phân biệt status code cho lỗi client-side và server-side? Tại sao?
12. Làm thế nào để test và validate việc sử dụng status code đúng chuẩn trong quy trình phát triển và deploy API?
13. Làm thế nào status code tương tác với các tiêu chuẩn khác như OAuth, OpenAPI để tạo ra trải nghiệm API hoàn chỉnh?
14. Những lỗi thường gặp khi dùng status code không chuẩn và tác hại của chúng trong hệ thống lớn là gì?
15. Làm sao để thiết kế status code sao cho thân thiện với client đa dạng (web, mobile, third-party apps)?

# ✅ Câu hỏi đào sâu về Caching với ETag, Cache-Control (Level Principle)

1. Nguyên lý cơ bản của HTTP caching là gì và tại sao caching lại quan trọng trong REST API?
2. ETag là gì? Cách thức hoạt động của ETag trong việc tối ưu cache như thế nào?
3. So sánh ETag với header Last-Modified: ưu điểm và hạn chế của từng phương pháp là gì?
4. Header Cache-Control gồm những directive phổ biến nào? Ý nghĩa và cách sử dụng từng directive (ví dụ: no-cache, no-store, max-age, must-revalidate, public, private)?
5. Làm thế nào để thiết kế API để tận dụng hiệu quả caching trên client, proxy, và server?
6. Khi nào nên dùng caching tạm thời (short-lived) và khi nào nên dùng caching lâu dài (long-lived)? Tiêu chí quyết định?
7. Cách xử lý cache invalidation khi dữ liệu resource thay đổi? Làm sao để đảm bảo cache không trả dữ liệu lỗi thời?
8. Sự khác biệt giữa caching đồng bộ (synchronous) và bất đồng bộ (asynchronous)? Tác động của chúng đến tính nhất quán dữ liệu?
9. Các vấn đề phổ biến khi sử dụng cache trong API và cách phòng tránh (ví dụ stale data, cache poisoning)?
10. Làm thế nào caching ảnh hưởng đến hiệu năng, băng thông và trải nghiệm người dùng cuối?
11. Khi sử dụng ETag, làm thế nào để thiết kế hệ thống sinh ETag hiệu quả và chính xác?
12. Ảnh hưởng của việc dùng Cache-Control đến các trình duyệt, CDN và proxy server khác nhau như thế nào?
13. Làm thế nào để test và đo lường hiệu quả caching trên API?
14. Mối quan hệ giữa caching và bảo mật trong API: cần lưu ý gì khi cache dữ liệu nhạy cảm?
15. Có nên kết hợp nhiều cơ chế cache (ETag + Cache-Control + expires) không? Cách phối hợp hiệu quả?

# Câu hỏi đào sâu về Versioning bằng Header hoặc URL (Level Principle)

1. **Tại sao cần versioning trong API, đặc biệt với hệ thống lớn và client đa dạng?**
2. Các phương pháp versioning phổ biến hiện nay là gì? So sánh ưu nhược điểm của versioning qua URL và qua Header.
3. Khi nào nên sử dụng versioning qua URL (ví dụ: `/v1/resource`) và khi nào nên dùng versioning qua Header (ví dụ: `Accept` header)?
4. Versioning ảnh hưởng như thế nào đến backward compatibility và forward compatibility của API?
5. Làm sao để thiết kế versioning sao cho dễ dàng nâng cấp mà không làm gián đoạn client hiện tại?
6. Chiến lược quản lý versioning (ví dụ version major, minor) như thế nào cho phù hợp với phát triển API liên tục?
7. Làm thế nào để xử lý việc deprecate (khai tử) một version API một cách an toàn, có thông báo cho client?
8. Versioning tác động thế nào đến caching, documentation và testing của API?
9. Làm thế nào để đồng bộ versioning trong hệ thống có nhiều microservices hoặc gateway?
10. Những lỗi phổ biến khi thiết kế versioning API và cách phòng tránh?
11. Làm sao để versioning hỗ trợ được cả API REST truyền thống và các chuẩn mới như GraphQL, gRPC?
12. Có nên kết hợp nhiều cách versioning không? Ví dụ versioning URL + Header cùng lúc?
13. Ảnh hưởng của versioning đến bảo mật và quản lý quyền truy cập API là gì?
14. Làm thế nào để truyền đạt thay đổi version API hiệu quả tới các developer bên client?
15. Những công cụ hoặc framework nào hỗ trợ quản lý version API hiệu quả?

# Câu hỏi đào sâu về Kiểm soát lifecycle của API, tránh breaking changes (Level Principle)

1. **Breaking changes là gì và tại sao chúng lại gây ra vấn đề lớn trong hệ thống API?**
2. Các loại breaking changes phổ biến trong API là gì? Ví dụ minh họa cho từng loại.
3. Tại sao việc kiểm soát lifecycle API lại quan trọng đối với hệ thống lâu dài và đa dạng client?
4. Các chiến lược versioning giúp hạn chế breaking changes như thế nào?
5. Làm sao để thiết kế API mới mà không làm gián đoạn hoặc ảnh hưởng tới các client đang sử dụng phiên bản cũ?
6. Vai trò của feature flags (cờ tính năng) trong việc kiểm soát breaking changes và release API mới?
7. Quy trình test và kiểm tra backward compatibility hiệu quả trong phát triển API là gì?
8. Làm thế nào để deprecate một API endpoint hay version một cách an toàn và thông báo đầy đủ cho client?
9. Các best practice trong việc quản lý deprecation và retirement API sao cho không làm gián đoạn dịch vụ?
10. Có những công cụ hoặc framework nào hỗ trợ phát hiện và ngăn chặn breaking changes tự động không?
11. Làm sao để giao tiếp hiệu quả với cộng đồng người dùng API khi có breaking changes lớn?
12. Tác động của breaking changes đến hệ sinh thái microservices và cách phối hợp kiểm soát?
13. Làm thế nào để cân bằng giữa phát triển tính năng mới và duy trì ổn định API cũ?
14. Những lỗi phổ biến trong kiểm soát lifecycle API và hậu quả của chúng trong vận hành hệ thống?
15. Làm thế nào để xây dựng một roadmap phát triển API bao gồm lifecycle, versioning, và kế hoạch xử lý breaking changes?

# Câu hỏi đào sâu về Authentication & Authorization (Level Principle)

## 1. Cách thiết kế API đảm bảo an toàn, quản lý user permission, token (OAuth, JWT, API key...)

1. **Authentication và Authorization khác nhau như thế nào? Vai trò của từng phần trong API?**
2. Các phương pháp authentication phổ biến hiện nay là gì? Ưu nhược điểm của OAuth 2.0, JWT, API Key?
3. Khi nào nên dùng OAuth 2.0 thay vì JWT hay API Key? Trường hợp phù hợp nhất cho từng loại?
4. Làm thế nào để thiết kế API sao cho an toàn trong việc truyền và lưu trữ token?
5. Cách thức hoạt động của JWT (JSON Web Token) và những điểm cần lưu ý khi sử dụng trong API?
6. Làm sao để bảo vệ token khỏi các cuộc tấn công như token theft, replay attack, CSRF?
7. Chiến lược refresh token và access token nên được thiết kế như thế nào để cân bằng bảo mật và trải nghiệm người dùng?
8. Làm thế nào để quản lý vòng đời token, bao gồm cấp phát, thu hồi và hết hạn?
9. Cách xử lý authorization khi có nhiều cấp quyền (role-based access control - RBAC) hoặc quyền dựa trên quyền hạn cụ thể (scope-based)?
10. Làm thế nào để API dễ dàng mở rộng hệ thống phân quyền mà vẫn đảm bảo hiệu suất và bảo mật?

## 2. Kiểm soát truy cập dựa trên role, scope, resource

11. Khác biệt giữa Role-Based Access Control (RBAC) và Attribute-Based Access Control (ABAC) là gì? Khi nào dùng mỗi loại?
12. Làm sao để thiết kế API kiểm soát truy cập granular (chi tiết đến từng resource, thuộc tính)?
13. Cách tổ chức và quản lý permission để giảm thiểu sai sót và phức tạp trong hệ thống lớn?
14. Làm thế nào để tích hợp kiểm soát truy cập với các middleware hoặc gateway một cách hiệu quả?
15. Chiến lược audit và logging truy cập để phát hiện và phản ứng kịp thời các hành vi bất thường hoặc trái phép?

# Câu hỏi đào sâu về Rate Limiting & Throttling (Level Principle)

## 1. Giới hạn số lượng request để bảo vệ hệ thống trước quá tải và abuse

1. **Rate Limiting và Throttling khác nhau thế nào? Tại sao đều cần trong API?**
2. Tại sao việc giới hạn request lại quan trọng trong hệ thống lớn và có nhiều client đa dạng?
3. Các cách phổ biến để triển khai rate limiting (token bucket, leaky bucket, fixed window, sliding window) là gì? Ưu nhược điểm của từng phương pháp?
4. Làm thế nào để xác định ngưỡng rate limit phù hợp cho từng loại API hoặc user/client?
5. Cách nhận biết và xử lý các hành vi abuse hoặc tấn công DDoS thông qua request rate?
6. Làm sao để đảm bảo rate limiting không ảnh hưởng quá mức đến trải nghiệm người dùng hợp lệ?
7. Tác động của rate limiting đến hệ thống phân tán, microservices hoặc khi sử dụng API gateway?

## 2. Thiết kế chiến lược rate limiting hiệu quả, thông báo lỗi hợp lý

8. Khi nào nên áp dụng rate limiting dựa trên IP, user ID, API key hoặc token?
9. Làm thế nào để thiết kế response khi bị giới hạn request (ví dụ HTTP 429 Too Many Requests) sao cho rõ ràng và hữu ích cho client?
10. Header HTTP nào nên dùng để báo cho client biết giới hạn hiện tại và thời gian reset (ví dụ `Retry-After`, `X-RateLimit-Remaining`)?
11. Làm sao để thiết kế cơ chế đồng bộ hoặc phân phối rate limiting khi hệ thống có nhiều node hoặc instance?
12. Có nên hỗ trợ burst request? Nếu có thì làm thế nào để cân bằng giữa burst và giới hạn tổng thể?
13. Làm thế nào để giám sát và báo cáo các sự kiện rate limit để phân tích và cải thiện chính sách?
14. Cách kết hợp rate limiting với authentication và authorization sao cho bảo mật và hiệu quả?
15. Các lỗi phổ biến khi triển khai rate limiting và cách phòng tránh chúng?

# Câu hỏi đào sâu về Error Handling & Logging (Level Principle)

## 1. Chuẩn hóa format lỗi (error response) để client dễ xử lý

1. **Tại sao cần chuẩn hóa format lỗi trong API? Ảnh hưởng của nó đến client như thế nào?**
2. Các tiêu chuẩn phổ biến để định dạng lỗi (ví dụ RFC 7807 - Problem Details for HTTP APIs) là gì? Ưu nhược điểm ra sao?
3. Những trường thông tin nào nên có trong một response lỗi chuẩn (ví dụ: code, message, details, timestamp, path)?
4. Làm sao để phân biệt rõ lỗi client (4xx) và lỗi server (5xx) trong response để client dễ xử lý?
5. Cách thiết kế message lỗi sao cho vừa rõ ràng, vừa bảo mật, không làm lộ thông tin nhạy cảm?
6. Làm thế nào để hỗ trợ đa ngôn ngữ (localization) trong thông báo lỗi API?
7. Khi API trả lỗi, có nên kèm theo hướng dẫn hoặc link tài liệu để client tự xử lý không?
8. Cách xử lý các lỗi phức tạp (ví dụ validation nhiều trường, lỗi đa lỗi cùng lúc) sao cho response dễ đọc và hữu ích?
9. Làm thế nào để chuẩn hóa lỗi trong hệ thống microservices có nhiều API khác nhau?
10. Làm sao để test tính nhất quán và chuẩn hóa của các response lỗi trong quy trình phát triển?

## 2. Log chi tiết và quản lý log để hỗ trợ debug, audit

11. Những thông tin nào cần được log trong trường hợp lỗi để hỗ trợ debug hiệu quả?
12. Làm thế nào để cân bằng giữa log chi tiết và bảo mật, tránh log thông tin nhạy cảm?
13. Cách thiết kế hệ thống logging để dễ dàng tìm kiếm, phân loại và phân tích log khi sự cố xảy ra?
14. Các công cụ và kỹ thuật phổ biến hiện nay để quản lý và phân tích log (ELK stack, Splunk, Datadog...) là gì?
15. Làm sao để tích hợp logging vào quy trình CI/CD và monitoring để phát hiện lỗi sớm và tự động cảnh báo?
16. Có nên log tất cả request/response hay chỉ những request lỗi? Ưu nhược điểm của từng cách?
17. Làm thế nào để xử lý log trong môi trường phân tán, microservices và serverless?
18. Cách đảm bảo log không làm ảnh hưởng hiệu năng của hệ thống?
19. Làm sao để lưu trữ và bảo quản log trong thời gian dài, phục vụ audit và compliance?
20. Các best practice về format log để dễ dàng tương tác với hệ thống phân tích và báo cáo?

# Câu hỏi đào sâu về Idempotency (Level Principle)

1. **Idempotency là gì và tại sao nó quan trọng trong thiết kế API, đặc biệt với các method POST/PUT/DELETE?**
2. Những HTTP methods nào theo chuẩn REST là idempotent và không idempotent? Vì sao?
3. Tác hại của việc không đảm bảo idempotency trong các request POST/PUT/DELETE là gì? Ví dụ thực tế?
4. Các cách phổ biến để đảm bảo idempotency cho các request POST (ví dụ: sử dụng client-generated idempotency key) là gì?
5. Làm thế nào để server lưu trữ và nhận diện các request idempotent để tránh xử lý trùng lặp?
6. Những thách thức và trade-offs khi thiết kế hệ thống hỗ trợ idempotency ở quy mô lớn, phân tán?
7. Cách xử lý idempotency khi có lỗi mạng hoặc timeout khiến client gửi lại request?
8. Liệu idempotency có thể áp dụng được cho các thao tác cập nhật một phần (PATCH) hoặc thao tác phức tạp không? Tại sao?
9. Các best practices khi thiết kế API idempotent để tương tác với các client đa dạng (web, mobile, third-party)?
10. Làm sao để test và đảm bảo tính idempotency trong quy trình phát triển và vận hành API?
11. Idempotency ảnh hưởng thế nào đến caching, retry logic và rate limiting trong API?
12. Làm thế nào để truyền đạt rõ ràng với client về việc sử dụng idempotency keys hoặc các cơ chế liên quan?
13. Có những chuẩn hay framework nào hỗ trợ xử lý idempotency hiệu quả?
14. Các lỗi thường gặp khi triển khai idempotency và cách khắc phục?
15. Liệu việc sử dụng idempotency có làm tăng độ phức tạp của backend không? Làm sao cân bằng?


# Câu hỏi đào sâu về Pagination, Filtering & Sorting (Level Principle)

1. **Tại sao pagination lại quan trọng khi trả dữ liệu lớn trong API?**
2. Các phương pháp pagination phổ biến hiện nay (offset-based, cursor-based, keyset pagination) là gì? Ưu nhược điểm của từng cách?
3. Làm thế nào để tránh bottleneck khi sử dụng offset pagination với offset lớn?
4. Cursor pagination hoạt động như thế nào và tại sao nó lại hiệu quả hơn trong một số trường hợp?
5. Cách thiết kế API để hỗ trợ filtering đa dạng và linh hoạt mà không ảnh hưởng hiệu năng?
6. Làm thế nào để kết hợp filtering với pagination và sorting mà vẫn đảm bảo tính nhất quán của dữ liệu?
7. Các kỹ thuật tối ưu query khi sử dụng sorting trên nhiều cột hoặc phức tạp?
8. Làm thế nào để xử lý các trường hợp dữ liệu thay đổi trong quá trình client đang phân trang?
9. Làm sao để API trả về thông tin metadata cần thiết cho client như tổng số bản ghi, trang hiện tại, số trang...
10. Cách thiết kế API để hỗ trợ sorting theo cả trường mặc định và trường tùy chọn?
11. Những lưu ý về bảo mật khi cho phép client query dữ liệu bằng filter hoặc sort (ví dụ SQL Injection)?
12. Làm thế nào để cache hiệu quả các response có pagination, filtering và sorting?
13. Chiến lược xử lý các truy vấn phức tạp như filtering theo nhiều điều kiện kết hợp AND/OR?
14. Làm sao để document rõ ràng và dễ hiểu các tham số pagination, filter, sort cho client?
15. Các lỗi phổ biến khi thiết kế pagination, filtering & sorting và cách phòng tránh?


# Câu hỏi đào sâu về API Documentation & Discoverability (Level Principle)

## 1. Tích hợp tài liệu tự động (Swagger/OpenAPI), giúp client dễ dàng sử dụng và cập nhật

1. **Tại sao tài liệu API lại quan trọng trong hệ thống lớn và đa dạng client?**
2. Các tiêu chuẩn và công cụ phổ biến để tạo tài liệu API tự động là gì? Ưu nhược điểm của Swagger/OpenAPI so với các phương án khác?
3. Làm thế nào để duy trì tài liệu API luôn cập nhật và đồng bộ với codebase?
4. Cách thiết kế tài liệu API sao cho dễ hiểu, đầy đủ và dễ dàng mở rộng khi có version mới?
5. Tài liệu API nên chứa những thông tin gì để hỗ trợ developer nhanh chóng và hiệu quả?
6. Làm sao để tích hợp tài liệu tự động vào quy trình phát triển (CI/CD) để giảm thiểu lỗi và tăng chất lượng?
7. Tác động của tài liệu tự động đến onboarding developer và tương tác giữa backend-client?
8. Cách xử lý tài liệu cho các endpoint private hoặc hạn chế truy cập (authorization)?
9. Làm sao để xử lý tài liệu API khi có breaking changes hoặc nhiều version tồn tại song song?
10. Các phương pháp tốt nhất để thu thập feedback và cải thiện tài liệu API theo thời gian?

## 2. Hỗ trợ tự khám phá API (HATEOAS nếu cần)

11. **Khái niệm HATEOAS (Hypermedia as the Engine of Application State) là gì và vai trò trong REST API?**
12. Lợi ích và hạn chế của việc áp dụng HATEOAS trong thiết kế API?
13. Làm thế nào để thiết kế API hỗ trợ tự khám phá resource và trạng thái thông qua liên kết (links) trong response?
14. Các chuẩn hoặc format thường dùng để biểu diễn hypermedia (HAL, JSON-LD, Siren, Collection+JSON)?
15. HATEOAS ảnh hưởng thế nào đến khả năng mở rộng, bảo trì và backward compatibility của API?
16. Khi nào nên và không nên áp dụng HATEOAS trong API?
17. Làm sao để client tận dụng các thông tin tự khám phá để giảm coupling và tăng tính linh hoạt?
18. Các thách thức kỹ thuật khi triển khai HATEOAS, ví dụ hiệu năng, complexity, tool hỗ trợ?
19. Làm thế nào để kết hợp tài liệu tự động với khả năng tự khám phá API?
20. Xu hướng hiện tại và tương lai của API discoverability trong ngành công nghiệp phần mềm?

# Câu hỏi đào sâu về Monitoring & Metrics (Level Principle)

1. **Tại sao việc monitoring API lại quan trọng trong vận hành hệ thống sản xuất?**
2. Các loại metrics cơ bản cần theo dõi cho API là gì? Ví dụ về metrics về hiệu năng, số lượng request, tỉ lệ lỗi, latency, throughput...
3. Làm sao để xác định các chỉ số (KPIs) quan trọng nhất để giám sát trạng thái sức khỏe API?
4. Cách thiết kế hệ thống monitoring sao cho có thể phát hiện sớm các sự cố và cảnh báo kịp thời?
5. Phân biệt giữa metrics, logs và traces trong hệ thống observability, vai trò của từng loại?
6. Làm thế nào để thiết lập alerting hiệu quả dựa trên các metrics mà không gây quá nhiều cảnh báo giả (false positives)?
7. Các công cụ phổ biến để giám sát API hiện nay (Prometheus, Grafana, Datadog, New Relic...) và tiêu chí lựa chọn?
8. Làm sao để thu thập metrics không làm ảnh hưởng đến hiệu năng của API?
9. Cách đo latency và phân tích bottleneck trong các thành phần API?
10. Làm thế nào để sử dụng metrics để tối ưu hóa hiệu suất và nâng cao trải nghiệm người dùng?
11. Làm thế nào để tích hợp monitoring vào quy trình phát triển và vận hành (DevOps/CI-CD)?
12. Cách giám sát các yếu tố bảo mật, ví dụ tỉ lệ xác thực thất bại, số lượng request bất thường?
13. Làm sao để báo cáo và phân tích xu hướng qua thời gian để đưa ra quyết định nâng cấp hay điều chỉnh API?
14. Tích hợp metrics vào dashboard và báo cáo thế nào để phù hợp với các đối tượng khác nhau (dev, ops, quản lý)?
15. Làm thế nào để mở rộng hệ thống monitoring khi API tăng trưởng về quy mô và số lượng endpoint?

# Câu hỏi đào sâu về Security Best Practices (Level Principle)

## 1. Bảo vệ chống các lỗ hổng phổ biến (Injection, XSS, CSRF...)

1. **Tại sao các lỗ hổng như Injection, XSS, CSRF lại phổ biến và nguy hiểm trong API/web services?**
2. Cơ chế tấn công của từng loại lỗ hổng Injection (SQL, NoSQL, Command Injection) là gì và cách phòng tránh hiệu quả?
3. XSS ảnh hưởng như thế nào đến client và server? Các biện pháp chính để phòng chống XSS trong API là gì?
4. CSRF là gì? Tại sao lại đặc biệt nguy hiểm trong các ứng dụng web? Các cách để ngăn chặn CSRF ra sao?
5. Làm thế nào để kiểm soát và validate input đầu vào nhằm ngăn chặn injection và các kiểu tấn công tương tự?
6. Vai trò của prepared statements và ORM trong việc giảm thiểu rủi ro injection?
7. Các kỹ thuật bảo vệ API khỏi lỗ hổng bảo mật liên quan đến authentication và authorization?
8. Làm thế nào để phát hiện và xử lý các payload độc hại trong request?
9. Tích hợp kiểm thử bảo mật (security testing) vào quy trình phát triển API như thế nào để phát hiện sớm các lỗ hổng?
10. Làm sao để cập nhật và patch các thư viện, framework để tránh lỗi bảo mật đã biết?

## 2. Sử dụng HTTPS bắt buộc, bảo vệ dữ liệu nhạy cảm

11. **Tại sao HTTPS là bắt buộc cho API trong môi trường hiện đại?**
12. Cách thức hoạt động của HTTPS và cơ chế mã hóa dữ liệu giữa client và server?
13. Các rủi ro nếu API không sử dụng HTTPS hoặc sử dụng HTTPS không đúng cách?
14. Làm thế nào để thiết lập HTTPS hiệu quả (ví dụ: sử dụng TLS version mới, chứng chỉ số hợp lệ)?
15. Cách xử lý các chứng chỉ SSL/TLS (renewal, trust, revocation) trong môi trường API?
16. Làm thế nào để bảo vệ dữ liệu nhạy cảm như token, mật khẩu, thông tin cá nhân khi truyền qua API?
17. Các kỹ thuật mã hóa dữ liệu ở mức ứng dụng (encryption at rest, encryption in transit) bổ sung cho HTTPS?
18. Làm thế nào để tích hợp kiểm tra bảo mật truyền tải trong quy trình DevOps?
19. Tác động của HTTPS đến hiệu năng và cách tối ưu hiệu năng khi sử dụng HTTPS?
20. Các best practices để đảm bảo toàn bộ hệ sinh thái API luôn được bảo vệ bằng HTTPS và các công nghệ bảo mật liên quan?
