| Hàm Kích Hoạt                    | Mô Tả                                                                                   | Biểu Thức                                                             |
| -------------------------------- | --------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| **Hàm tuyến tính (identity)**    | Tín hiệu đi qua nguyên vẹn, không thay đổi. Gần như không bao giờ dùng.                 | `f(x) = x`                                                            |
| **Hàm bậc thang (Heaviside)**    | Cho đầu ra nhị phân 0 hoặc 1. Dùng trong phân loại nhị phân.                            | `f(x) = 0 nếu wx + b ≤ 0, ngược lại f(x) = 1`                         |
| **Sigmoid (logistic)**           | Nén đầu vào về khoảng từ **0 đến 1**, thường dùng cho bài toán phân loại nhị phân.      | `σ(z) = 1 / (1 + exp(–z))`                                            |
| **Softmax**                      | Tổng quát hóa sigmoid, dùng khi có nhiều hơn 2 lớp phân loại.                           | `σ(xⱼ) = exp(xⱼ) / Σᵢ exp(xᵢ)`                                        |
| **Tanh (hyperbolic tangent)**    | Nén giá trị về khoảng từ **–1 đến 1**, thường tốt hơn sigmoid ở các lớp ẩn.             | `tanh(x) = sinh(x)/cosh(x) = (exp(x) – exp(–x)) / (exp(x) + exp(–x))` |
| **ReLU (Rectified Linear Unit)** | Kích hoạt khi đầu vào > 0, nếu không thì bằng 0. Phù hợp cho lớp ẩn, hiệu quả hơn tanh. | `f(x) = max(0, x)`                                                    |
| **Leaky ReLU**                   | Giới thiệu độ dốc âm nhỏ (khoảng 0.01) khi x < 0 thay vì bằng 0 như ReLU.               | `f(x) = max(0.01x, x)`                                                |
