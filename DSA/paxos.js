import http from "http";
import url from "url";

// ====== CONFIG ======
const PORT = process.argv[2] ? parseInt(process.argv[2]) : 3001;
const NODES = [3001, 3002, 3003, 3004, 3005];
const MAJORITY = Math.floor(NODES.length / 2) + 1;

// ====== STATE (per node) ======
let maxPrepareSeen = 0;             // largest proposal number promised
let acceptedProposal = 0;           // proposal number accepted
let acceptedValue = null;           // value accepted

// ====== UTILS ======
function log(...args) {
    console.log(`[Node ${PORT}]`, ...args);
}

function readBody(req) {
    return new Promise((resolve, reject) => {
        let data = "";
        req.on("data", chunk => data += chunk);
        req.on("end", () => {
            try {
                resolve(JSON.parse(data || "{}"));
            } catch (e) {
                resolve({});
            }
        });
        req.on("error", reject);
    });
}

// ====== PHASE 1: PREPARE / PROMISE ======
function PROMISE(proposalNumber) {
    if (proposalNumber > maxPrepareSeen) {
        maxPrepareSeen = proposalNumber;
        log(`PROMISE for proposal ${proposalNumber}, previously accepted=(${acceptedProposal}, ${acceptedValue})`);
        return {
            type: "promise",
            acceptedProposal,
            acceptedValue
        };
    }
    log(`REJECT prepare n=${proposalNumber}, already promised >= ${maxPrepareSeen}`);
    return { type: "reject", reason: "smaller_n", current: maxPrepareSeen };
}

// ====== PHASE 2: ACCEPT / ACCEPTED ======
function ACCEPT(proposalNumber, value) {
    if (proposalNumber < maxPrepareSeen) {
        log(`REJECT accept n=${proposalNumber}, promised higher ${maxPrepareSeen}`);
        return { type: "reject" };
    }
    acceptedProposal = proposalNumber;
    acceptedValue = value;
    log(`ACCEPTED value=${value} for proposal=${proposalNumber}`);
    return { type: "accepted" };
}

// ====== ROUTES ======
const routes = {
    "GET /health": (req, res) => {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
            status: "ok",
            port: PORT,
            maxPrepareSeen,
            acceptedProposal,
            acceptedValue
        }));
    },

    "POST /prepare": async (req, res) => {
        const body = await readBody(req);
        const { n } = body;
        const result = PROMISE(n);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(result));
    },

    "POST /accept": async (req, res) => {
        const body = await readBody(req);
        const { n, v } = body;
        const result = ACCEPT(n, v);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(result));
    },

    // ====== Manual proposer (run only on one node) ======
    "POST /proposal": async (req, res) => {
        const body = await readBody(req);
        const { n: proposalNumber, v: proposedValue } = body;

        log(`Starting proposal n=${proposalNumber}, v=${proposedValue}`);

        // ---- PHASE 1: Send PREPARE to all ----
        const prepareResults = await Promise.all(
            NODES.filter(p => p !== PORT).map(p =>
                fetch(`http://localhost:${p}/prepare`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ n: proposalNumber })
                }).then(r => r.json()).catch(() => ({ type: "reject" }))
            )
        );

        const promises = prepareResults.filter(r => r.type === "promise");
        if (promises.length < MAJORITY) {
            log(`Not enough promises (${promises.length}/${MAJORITY}) → ABORT`);
            res.writeHead(200, { "Content-Type": "application/json" });
            return res.end(JSON.stringify({ result: "abort", reason: "not_enough_promises" }));
        }

        // ---- Choose value ----
        let valueToPropose = proposedValue;
        const validAccepted = promises.filter(r => r.acceptedProposal > 0);
        if (validAccepted.length > 0) {
            const maxAccepted = validAccepted.reduce((max, r) =>
                r.acceptedProposal > max.acceptedProposal ? r : max, validAccepted[0]);
            valueToPropose = maxAccepted.acceptedValue;
            log(`Found previous accepted value=${valueToPropose} (from proposal ${maxAccepted.acceptedProposal})`);
        }

        // ---- PHASE 2: Send ACCEPT to all ----
        const acceptResults = await Promise.all(
            NODES.filter(p => p !== PORT).map(p =>
                fetch(`http://localhost:${p}/accept`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ n: proposalNumber, v: valueToPropose })
                }).then(r => r.json()).catch(() => ({ type: "reject" }))
            )
        );

        const accepted = acceptResults.filter(r => r.type === "accepted");
        if (accepted.length >= MAJORITY) {
            log(`✅ VALUE CHOSEN: ${valueToPropose}`);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ result: "chosen", value: valueToPropose }));
        } else {
            log(`❌ Proposal ${proposalNumber} failed (${accepted.length}/${MAJORITY})`);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ result: "failed" }));
        }
    }
};

// ====== HTTP SERVER ======
const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const routeKey = `${req.method} ${parsedUrl.pathname}`;
    const handler = routes[routeKey];

    if (handler) {
        try {
            await handler(req, res);
        } catch (err) {
            console.error("Handler error:", err);
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "internal_error" }));
        }
    } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "not_found" }));
    }
});

server.listen(PORT, () => {
    console.log(`Node running on port ${PORT}`);
});
