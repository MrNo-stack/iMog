const getInputs = () => {
    return {
        propCost: parseFloat(document.getElementById('propCost').value) || 0,
        interestRate: parseFloat(document.getElementById('interestRate').value) || 0,
        loanTerm: parseFloat(document.getElementById('loanTermMogger').value) || 0,
        growthRate: parseFloat(document.getElementById('growthRateMogger').value) || 0,
        downPayment: parseFloat(document.getElementById('downPayment').value) || 0,
        investReturn: parseFloat(document.getElementById('investReturn').value) || 0,
        timeHorizon: parseFloat(document.getElementById('timeHorizon').value) || 0
    };
};

// Sync inputs
const sync = (id1, id2) => {
    document.getElementById(id1).addEventListener('input', (e) => { document.getElementById(id2).value = e.target.value; update(); });
    document.getElementById(id2).addEventListener('input', (e) => { document.getElementById(id1).value = e.target.value; update(); });
};
sync('propCost', 'propCostSoy');
sync('growthRateMogger', 'growthRateSoyboy');
sync('loanTermMogger', 'loanTermSoyboy');
document.getElementById('downPayment').addEventListener('input', (e) => {
    document.getElementById('initialInvestMogger').value = e.target.value;
    update();
});

const renderSprites = (winner) => {
    const moggerBox = document.getElementById('mogger-box');
    const soyboyBox = document.getElementById('soyboy-box');
    const isMogWin = winner === 'MOGGER';
    
    // Re-inject floor grid
    moggerBox.innerHTML = '<div class="floor-grid"></div>';
    soyboyBox.innerHTML = '<div class="floor-grid"></div>';

    // Add blood pool if loser
    if (isMogWin) {
        soyboyBox.innerHTML += '<div class="blood-pool" style="left: 40%"></div>';
    } else {
        moggerBox.innerHTML += '<div class="blood-pool" style="left: 40%"></div>';
    }

    // MOGGER: Ultra Detail
    const mSvg = `
        <div class="${isMogWin ? 'aura-mogger' : ''}" style="bottom: 80px"></div>
        <svg viewBox="0 0 100 120" class="w-48 h-64 z-10 ${isMogWin ? 'win-pose' : 'ko-pose'}">
            <defs>
                <linearGradient id="suitGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#333" />
                    <stop offset="100%" stop-color="#111" />
                </linearGradient>
            </defs>
            <!-- Body -->
            <rect x="20" y="45" width="60" height="65" fill="url(#suitGrad)" /> <!-- V-Taper Suit -->
            <path d="M20 45 L50 110 L80 45 Z" fill="#1a1a1a" /> <!-- Muscle shadow -->
            <path d="M42 45 L50 65 L58 45 Z" fill="#fff" /> <!-- Crisp White Shirt -->
            <rect x="49" y="45" width="2" height="25" fill="#ff00ff" /> <!-- Neon Tie -->
            
            <!-- Arms -->
            <rect x="5" y="48" width="16" height="40" fill="#222" rx="4" />
            <rect x="79" y="48" width="16" height="40" fill="#222" rx="4" />
            <rect x="5" y="85" width="16" height="12" fill="#e0ac69" />
            <rect x="79" y="85" width="16" height="12" fill="#e0ac69" />

            <!-- Head -->
            <rect x="35" y="10" width="30" height="35" fill="#e0ac69" />
            <path d="M35 15 L65 15 L65 10 L60 5 L40 5 L35 10 Z" fill="#111" /> <!-- Pompadour -->
            <rect x="37" y="22" width="26" height="7" fill="#000" /> <!-- Sunglasses -->
            <rect x="37" y="22" width="10" height="2" fill="#fff" opacity="0.3" /> <!-- Glass shine -->
            <path d="M35 38 L50 45 L65 38 Z" fill="#c68642" /> <!-- Strong Jawline -->
            
            <!-- Watch/Jewelry -->
            <rect x="79" y="88" width="16" height="4" fill="#ffd700" />
        </svg>`;
    
    // SOYBOY: Ultra Detail
    const sSvg = `
        <div class="${!isMogWin ? 'aura-soyboy' : ''}" style="bottom: 80px"></div>
        <svg viewBox="0 0 100 120" class="w-48 h-64 z-10 ${!isMogWin ? 'win-pose' : 'ko-pose'}">
            <!-- Body -->
            <rect x="30" y="55" width="40" height="50" fill="#444" /> <!-- Hoodie -->
            <rect x="35" y="65" width="30" height="30" fill="#666" rx="2" /> <!-- Pocket -->
            <rect x="49" y="55" width="2" height="50" fill="#222" /> <!-- Zipper -->
            
            <!-- Head -->
            <rect x="38" y="25" width="24" height="30" fill="#e0ac69" />
            <path d="M38 25 L62 25 L62 20 L55 15 L45 15 L38 20 Z" fill="#8b4513" /> <!-- Messy Gamer Hair -->
            
            <!-- Headset -->
            <rect x="35" y="30" width="5" height="12" fill="#111" rx="2" />
            <rect x="60" y="30" width="5" height="12" fill="#111" rx="2" />
            <path d="M35 30 Q50 15 65 30" fill="none" stroke="#111" stroke-width="3" />
            
            <!-- Face -->
            <circle cx="44" cy="38" r="4" fill="none" stroke="#000" stroke-width="1" /> <!-- Glasses -->
            <circle cx="56" cy="38" r="4" fill="none" stroke="#000" stroke-width="1" />
            <rect x="48" y="38" width="4" height="0.5" fill="#000" />
            <circle cx="50" cy="46" r="2.5" fill="#000" opacity="0.7" /> <!-- Soy mouth -->
            
            <!-- Arms -->
            <rect x="22" y="60" width="10" height="35" fill="#444" />
            <rect x="68" y="60" width="10" height="35" fill="#444" />
            <rect x="22" y="92" width="10" height="8" fill="#e0ac69" />
            <rect x="68" y="92" width="10" height="8" fill="#e0ac69" />
        </svg>`;

    moggerBox.innerHTML += mSvg;
    soyboyBox.innerHTML += sSvg;
};

let myChart;
function update() {
    console.log("Update run");

    const data = getInputs();
    const monthly_mortgage_payment = calculateMonthlyMortgagePayment(data.propCost - data.downPayment, data.interestRate, data.loanTerm);
    const monthly_payment = monthly_mortgage_payment * 1.5; // Account for taxes, maintenance, and insurance
    
    document.getElementById('monthly-diff').innerText = `$${Math.round(monthly_payment).toLocaleString()}`;
    document.getElementById('monthlyInvestSoyboy').value = Math.round(monthly_payment);

    const labels = [];
    const valMogger = [];
    const valSoyboy = [];
    const breakdown = { mogger: [], soyboy: [] };

    const rI = data.investReturn / 100;
    const rP = data.growthRate / 100;

    for (let t = 0; t <= data.timeHorizon; t++) {
        labels.push(`YR ${t}`);
        
        // Mogger invests the down payment in the stock market.
        // Assume that Mogger can rent for the same as the mortgage payment, and invest the difference.
        const monthlyInvestment = monthly_payment - monthly_mortgage_payment;
        const invMogger = calculateCompoundInterest(data.downPayment, monthlyInvestment, rI, t);
        valMogger.push(invMogger);
        breakdown.mogger.push({ inv: invMogger });

        // Soyboy buys real estate and pays the mortgage. He does NOT invest in the stock market.
        const invSoyboy = calculatePropertyNetWorth(
            data.propCost,
            data.downPayment,
            data.growthRate,
            data.interestRate,
            data.loanTerm,
            t
        );
        valSoyboy.push(invSoyboy);
        breakdown.soyboy.push({ inv: invSoyboy });
    }

    const finalM = valMogger[valMogger.length - 1];
    const finalS = valSoyboy[valSoyboy.length - 1];
    const winner = finalM > finalS ? 'MOGGER' : 'SOYBOY';

    document.getElementById('winner-text').innerText = `${winner} DOMINATES!`;
    document.getElementById('final-mogger').innerText = `$${finalM.toLocaleString()}`;
    document.getElementById('final-soyboy').innerText = `$${finalS.toLocaleString()}`;
    
    const maxVal = Math.max(finalM, finalS);
    const mPct = Math.round((finalM / maxVal) * 100);
    const sPct = Math.round((finalS / maxVal) * 100);
    
    document.getElementById('mogger-health').style.width = mPct + '%';
    document.getElementById('soyboy-health').style.width = sPct + '%';
    document.getElementById('mogger-hp-text').innerText = mPct + '% HP';
    document.getElementById('soyboy-hp-text').innerText = sPct + '% HP';

    renderSprites(winner);

    if (myChart) myChart.destroy();
    const ctx = document.getElementById('mainChart').getContext('2d');
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels,
            datasets: [
                { 
                    label: 'MOGGER EQUITY', 
                    data: valMogger, 
                    borderColor: '#ff00ff', 
                    borderWidth: 5, 
                    pointRadius: 4,
                    pointBackgroundColor: '#fff',
                    fill: true, 
                    backgroundColor: 'rgba(255,0,255,0.05)', 
                    breakdown: breakdown.mogger 
                },
                { 
                    label: 'SOYBOY EQUITY', 
                    data: valSoyboy, 
                    borderColor: '#00ffff', 
                    borderWidth: 5, 
                    pointRadius: 4,
                    pointBackgroundColor: '#fff',
                    fill: true, 
                    backgroundColor: 'rgba(0,255,255,0.05)', 
                    breakdown: breakdown.soyboy 
                }
            ]
        },
        options: {
            responsive: true,
            interaction: { mode: 'index', intersect: false },
            plugins: {
                legend: { labels: { color: '#fff', font: { family: "'Press Start 2P'", size: 8 } } },
                tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.9)',
                    titleFont: { family: "'Press Start 2P'", size: 10 },
                    bodyFont: { family: "'Press Start 2P'", size: 8 },
                    padding: 15,
                    borderColor: '#555',
                    borderWidth: 2,
                    callbacks: {
                        label: (context) => {
                            const b = context.dataset.breakdown[context.dataIndex];
                            return [
                                ` TOTAL: $${context.parsed.y.toLocaleString()}`
                            ];
                        }
                    }
                }
            },
            scales: {
                y: { grid: { color: '#222' }, ticks: { color: '#888', font: { size: 8 } } },
                x: { grid: { color: '#222' }, ticks: { color: '#888', font: { size: 8 } } }
            }
        }
    });
}

// Export for Node (so tests can require this file)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { simulate_stocks };
}