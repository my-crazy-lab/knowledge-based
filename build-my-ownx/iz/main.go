package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"

	git "github.com/go-git/go-git/v6"
	"github.com/go-git/go-git/v6/plumbing/object"
)

const githubAPI = "https://api.github.com"

type Commit struct {
	SHA string `json:"sha"`
}

type SearchResult struct {
	TotalCount int `json:"total_count"`
}

func fetchCommits(owner, repo, username string) int {
	url := fmt.Sprintf("https://api.github.com/search/commits?q=repo:%s/%s+author:%s", owner, repo, username)
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		log.Printf("Failed to create request: %v", err)
		return 0
	}

	req.Header.Set("Accept", "application/vnd.github.cloak-preview")
	req.Header.Set("User-Agent", "go-client")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		log.Printf("Request error: %v", err)
		return 0
	}
	defer resp.Body.Close()

	if resp.StatusCode != 200 {
		log.Printf("GitHub API returned status %d", resp.StatusCode)
		return 0
	}

	var result struct {
		TotalCount int `json:"total_count"`
	}
	err = json.NewDecoder(resp.Body).Decode(&result)
	if err != nil {
		log.Printf("Failed to decode JSON: %v", err)
		return 0
	}

	return result.TotalCount
}

func fetchPRs(owner, repo, author string) int {
	url := fmt.Sprintf("%s/search/issues?q=repo:%s/%s+type:pr+author:%s", githubAPI, owner, repo, author)
	resp, err := http.Get(url)
	if err != nil || resp.StatusCode != 200 {
		fmt.Printf("❌ Error fetching PRs: %v (status %d)\n", err, resp.StatusCode)
		return 0
	}
	defer resp.Body.Close()

	var result SearchResult
	json.NewDecoder(resp.Body).Decode(&result)

	return result.TotalCount
}

func fetchIssues(owner, repo, author string) int {
	url := fmt.Sprintf("%s/search/issues?q=repo:%s/%s+type:issue+author:%s", githubAPI, owner, repo, author)
	resp, err := http.Get(url)
	if err != nil || resp.StatusCode != 200 {
		fmt.Printf("❌ Error fetching issues: %v (status %d)\n", err, resp.StatusCode)
		return 0
	}
	defer resp.Body.Close()

	var result SearchResult
	json.NewDecoder(resp.Body).Decode(&result)

	return result.TotalCount
}

func countCommitsByAuthor(repoPath, authorName string) (int, error) {
	// Open local repository
	repo, err := git.PlainOpen(repoPath)
	if err != nil {
		return 0, err
	}

	// Get HEAD reference
	ref, err := repo.Head()
	if err != nil {
		return 0, err
	}

	// Get commit iterator starting from HEAD
	cIter, err := repo.Log(&git.LogOptions{From: ref.Hash()})
	if err != nil {
		return 0, err
	}

	count := 0
	err = cIter.ForEach(func(c *object.Commit) error {
		if c.Author.Name == authorName {
			count++
		}
		return nil
	})
	if err != nil {
		return 0, err
	}

	return count, nil
}

func main() {
	basic()

	gogit()
}

func basic() {
	owner := "pnpm"
	repo := "pnpm"
	username := "zkochan"

	fmt.Printf("🔍 Checking contributions for @%s in %s/%s\n", username, owner, repo)

	commits := fetchCommits(owner, repo, username)
	prs := fetchPRs(owner, repo, username)
	issues := fetchIssues(owner, repo, username)

	fmt.Println("📊 Contribution Summary:")
	fmt.Printf("📝 Commits:        %d\n", commits)
	fmt.Printf("🔀 Pull Requests:  %d\n", prs)
	fmt.Printf("❗ Issues:         %d\n", issues)
}

func gogit() {
	owner := "pnpm"
	repoName := "pnpm"
	author := "zkochan"

	// Clone repo folder path (you can change as needed)
	repoPath := filepath.Join(os.TempDir(), repoName)

	// Check if repo already cloned
	_, err := os.Stat(repoPath)
	if os.IsNotExist(err) {
		fmt.Printf("Cloning repo %s/%s...\n", owner, repoName)
		_, err := git.PlainClone(repoPath, &git.CloneOptions{
			URL:      fmt.Sprintf("https://github.com/%s/%s.git", owner, repoName),
			Progress: os.Stdout,
		})
		if err != nil {
			log.Fatalf("Failed to clone repo: %v", err)
		}
	} else if err != nil {
		log.Fatalf("Failed to access repo path: %v", err)
	} else {
		fmt.Println("Repo already cloned locally, opening...")
	}

	// Count commits by author
	commits, err := countCommitsByAuthor(repoPath, author)
	if err != nil {
		log.Fatalf("Failed to count commits: %v", err)
	}

	fmt.Printf("Author %s has %d commits in %s/%s\n", author, commits, owner, repoName)

	// For PRs and Issues counts you can still call your existing GitHub API functions if needed
}
