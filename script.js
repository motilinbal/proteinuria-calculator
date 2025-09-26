document.getElementById('calcForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const albumin = parseFloat(document.getElementById('albumin').value);
    const protein = parseFloat(document.getElementById('protein').value);
    const creatinine = parseFloat(document.getElementById('creatinine').value);
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '';

    // Input Validation
    let errors = [];
    let warnings = [];
    if (isNaN(albumin) || isNaN(protein) || isNaN(creatinine) || albumin < 0 || protein < 0 || creatinine <= 0) {
        errors.push('All inputs must be positive numbers (creatinine >0).');
    }
    if (albumin > protein) {
        errors.push('Urine albumin cannot exceed urine protein. Please check inputs.');
    }
    if (creatinine < 10 || creatinine > 5000) {
        warnings.push('Urine creatinine value is atypical (normal range ~500-2000 mg/L). Results may be unreliable; consider dilute/concentrated sample.');
    }
    if (protein < 1 || protein > 10000) {
        warnings.push('Urine protein value is extreme. Verify lab results.');
    }

    if (errors.length > 0) {
        outputDiv.innerHTML = errors.map(err => `<p class="error">${err}</p>`).join('');
        return;
    }

    // Core Calculations
    const ACR = (albumin / creatinine) * 1000;
    const PCR = (protein / creatinine) * 1000;
    let APR = 'N/A (no proteinuria)';
    if (PCR > 0) {
        APR = (ACR / PCR).toFixed(2);
    }
    const NAP = PCR - ACR;

    // Categorization
    let acrCategory = '';
    if (ACR < 30) acrCategory = 'Normal albuminuria';
    else if (ACR <= 300) acrCategory = 'Moderately increased albuminuria (microalbuminuria)';
    else acrCategory = 'Severely increased albuminuria (macroalbuminuria)';

    let pcrCategory = '';
    if (PCR < 150) pcrCategory = 'Normal proteinuria';
    else if (PCR <= 500) pcrCategory = 'Mild proteinuria';
    else if (PCR <= 3500) pcrCategory = 'Moderate proteinuria';
    else pcrCategory = 'Nephrotic range proteinuria';

    let aprCategory = '';
    if (PCR > 0) {
        if (APR > 0.5) aprCategory = 'High (suggests predominantly glomerular, selective albumin loss)';
        else if (APR >= 0.4) aprCategory = 'Borderline (possible mixed or early glomerular)';
        else aprCategory = 'Low (suggests non-glomerular, e.g., tubular/overflow)';
    }

    let napCategory = '';
    if (NAP < 150) napCategory = 'Low (minimal non-albumin component)';
    else if (NAP <= 300) napCategory = 'Mildly elevated';
    else napCategory = 'Significantly elevated (high risk for tubular damage and mortality)';

    // Clinical Conclusions (conditional logic)
    let conclusions = [];

    // Base on ACR
    if (ACR < 30) {
        conclusions.push('The ACR is normal, indicating no significant albuminuria.');
    } else if (ACR <= 300) {
        conclusions.push('The ACR indicates moderately increased albuminuria (microalbuminuria), an early marker of kidney damage associated with increased risk of CKD progression and cardiovascular events; consider screening for underlying causes and initiating renoprotective therapies (e.g., ACE inhibitors/ARBs or SGLT2 inhibitors if applicable).');
    } else {
        conclusions.push('The ACR indicates severely increased albuminuria (macroalbuminuria), associated with rapid CKD progression, higher all-cause mortality, and warrants urgent evaluation.');
    }

    // Base on PCR
    if (PCR < 150) {
        conclusions.push('The PCR is normal, indicating no significant overall proteinuria.');
    } else if (PCR <= 500) {
        conclusions.push('The PCR indicates mild proteinuria, which may warrant monitoring for progression to nephrotic range (>3500 mg/g).');
    } else if (PCR <= 3500) {
        conclusions.push('The PCR indicates moderate proteinuria, correlating well with 24-hour excretion (~0.5-3.5 g/day); monitor for symptoms like edema if progressing.');
    } else {
        conclusions.push('The PCR indicates nephrotic-range proteinuria (>3500 mg/g), associated with hypoalbuminemia, edema, and thrombosis risk; urgent assessment needed.');
    }

    // Base on APR
    if (PCR > 0) {
        if (APR > 0.5) {
            conclusions.push(`The high APR (>0.5) points toward selective glomerular proteinuria, making glomerular diseases (e.g., glomerulonephritis, diabetic nephropathy) more likely than tubular or overflow causes. This accentuates the ACR relative to PCR, supporting a glomerular etiology.`);
        } else if (APR >= 0.4) {
            conclusions.push(`The borderline APR (0.4-0.5) suggests possible mixed etiology, with glomerular dominance but some non-selective loss—less accentuated ACR relative to PCR, pushing slightly away from pure glomerular toward mixed glomerular-tubular (e.g., diabetic kidney disease with interstitial components).`);
        } else {
            conclusions.push(`The low APR (<0.4) points away from glomerular diseases toward non-glomerular causes like tubular dysfunction, acute interstitial nephritis, or overflow (e.g., light chains in myeloma). ACR is proportional to expected albumin, not exaggerated.`);
            if (PCR > 3500) {
                conclusions.push(`The very low APR (<0.4) strongly suggests overflow proteinuria (e.g., paraproteins in multiple myeloma) or severe tubular damage, pushing far from glomerular etiology.`);
            }
        }
    }

    // Base on NAP
    if (NAP < 150) {
        conclusions.push('The NAP is low, with no evidence of tubulointerstitial injury.');
    } else if (NAP <= 300) {
        conclusions.push('The NAP is mildly elevated but below high-risk thresholds (>250-300 mg/g), suggesting limited tubulointerstitial involvement; however, if persistent, it may indicate additional tubular damage and higher mortality risk.');
    } else {
        conclusions.push('The significantly elevated NAP (>300 mg/g) is a key marker of tubulointerstitial injury, predicting higher mortality (e.g., adjusted HR ~1.4 per doubling) and CKD progression independent of ACR; this may reflect acute interstitial nephritis or chronic damage.');
    }

    // Recommendations (always include)
    let recommendations = 'Recommendations: Confirm with repeat testing (e.g., early morning spot urine) to rule out transients like exercise or infection. If ACR >300 mg/g on repeat, consider referral to nephrology for potential biopsy or further evaluation (e.g., serum creatinine, eGFR, urine microscopy). Rule out overflow proteinuria (e.g., via urine protein electrophoresis) if APR <0.4 in future tests. Monitor for systemic risks and adjust based on KDIGO guidelines.';
    if (ACR >= 30) {
        recommendations += ' Initiate therapies per KDIGO (e.g., RAS inhibitors, SGLT2i for ACR >=30).';
    }
    if (PCR > 500) {
        recommendations += ' If confirmed non-glomerular, focus on reversible causes (e.g., drugs, infection). PCR may be better for monitoring here than ACR. Refer to nephrology if PCR >500 mg/g persists.';
    }
    if (PCR > 3500) {
        recommendations += ' Immediate urine immunofixation/electrophoresis to confirm overflow.';
    }
    conclusions.push(recommendations);

    // No action if normal
    if (ACR < 30 && PCR < 150) {
        conclusions = ['No increased risk for CKD progression or CV events from proteinuria. Recommendations: No immediate action; routine screening as per guidelines (e.g., annual in high-risk patients like diabetics).'];
    }

    // Render Output
    let html = '';
    if (warnings.length > 0) {
        html += warnings.map(warn => `<p class="warning">${warn}</p>`).join('');
    }
    html += `
        <div class="section">
            <strong>Calculated ACR:</strong> ${ACR.toFixed(2)} mg/g<br>
            <strong>Category:</strong> ${acrCategory}
        </div>
        <div class="section">
            <strong>Calculated PCR:</strong> ${PCR.toFixed(2)} mg/g<br>
            <strong>Category:</strong> ${pcrCategory}
        </div>
        <div class="section">
            <strong>Albumin fraction (APR):</strong> ${APR}<br>
            <strong>Category:</strong> ${aprCategory}
        </div>
        <div class="section">
            <strong>Non-albumin proteinuria (NAP):</strong> ${NAP.toFixed(2)} mg/g<br>
            <strong>Category:</strong> ${napCategory}
        </div>
        <div class="section">
            <strong>Clinical Conclusions:</strong>
            <ul>
                ${conclusions.map(conc => `<li>${conc}</li>`).join('')}
            </ul>
        </div>
    `;
    outputDiv.innerHTML = html;
});