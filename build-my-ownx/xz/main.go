package main

import (
	"fmt"
	"math"
	"time"
)

// Tạo màu RGB theo vị trí i
func rainbowColor(freq float64, i float64) (int, int, int) {
	red := math.Sin(freq*i+0)*127 + 128
	green := math.Sin(freq*i+2*math.Pi/3)*127 + 128
	blue := math.Sin(freq*i+4*math.Pi/3)*127 + 128
	return int(red), int(green), int(blue)
}

// In một dòng với màu cầu vồng cho từng ký tự
func printRainbowLine(text string, lineIndex int) {
	freq := 0.2                      // Tần số màu
	offset := float64(lineIndex * 2) // Tạo độ lệch màu theo dòng

	for i, c := range text {
		r, g, b := rainbowColor(freq, float64(i)+offset)
		fmt.Printf("\x1b[38;2;%d;%d;%dm%c", r, g, b, c)
	}
	fmt.Print("\x1b[0m\n") // Reset màu
}

func main() {
	logs := []string{
		"[INFO] Starting server on port 8080",
		"[DEBUG] Initializing config loader",
		"[INFO] Database connected successfully",
		"[WARN] Using default value for timeout",
		"[ERROR] Failed to open file config.yaml",
		"[DEBUG] Retrying connection...",
		"[INFO] Server started at http://localhost",
		"[INFO] Handling request /api/user",
		"[DEBUG] Fetching data from cache",
		"[INFO] Shutdown signal received",
		"[INFO] Starting server on port 8080",
		"[DEBUG] Initializing config loader",
		"[INFO] Database connected successfully",
		"[WARN] Using default value for timeout",
		"[ERROR] Failed to open file config.yaml",
		"[DEBUG] Retrying connection...",
		"[INFO] Server started at http://localhost",
		"[INFO] Handling request /api/user",
		"[DEBUG] Fetching data from cache",
		"[INFO] Shutdown signal received",
		"[INFO] Starting server on port 8080",
		"[DEBUG] Initializing config loader",
		"[INFO] Database connected successfully",
		"[WARN] Using default value for timeout",
		"[ERROR] Failed to open file config.yaml",
		"[DEBUG] Retrying connection...",
		"[INFO] Server started at http://localhost",
		"[INFO] Handling request /api/user",
		"[DEBUG] Fetching data from cache",
		"[INFO] Shutdown signal received",
		"[INFO] Starting server on port 8080",
		"[DEBUG] Initializing config loader",
		"[INFO] Database connected successfully",
		"[WARN] Using default value for timeout",
		"[ERROR] Failed to open file config.yaml",
		"[DEBUG] Retrying connection...",
		"[INFO] Server started at http://localhost",
		"[INFO] Handling request /api/user",
		"[DEBUG] Fetching data from cache",
		"[INFO] Shutdown signal received",
	}

	for i, line := range logs {
		printRainbowLine(line, i)
		time.Sleep(100 * time.Millisecond) // Tạo hiệu ứng hiển thị mượt
	}
}
