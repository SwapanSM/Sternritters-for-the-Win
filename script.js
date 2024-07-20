document.getElementById('ats-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const resumeFile = document.getElementById('resume').files[0];
    const jobDescription = document.getElementById('job-description').value;

    if (resumeFile) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const resumeText = event.target.result;
            const result = checkCompatibility(resumeText, jobDescription);
            document.getElementById('result').innerHTML = `<h2>Compatibility Score: ${result}%</h2>`;
        };
        reader.readAsText(resumeFile);
    }
});

function checkCompatibility(resume, jobDescription) {
    const resumeWords = resume.toLowerCase().split(/\W+/);
    const jobWords = jobDescription.toLowerCase().split(/\W+/);
    
    let matchCount = 0;
    jobWords.forEach(word => {
        if (resumeWords.includes(word)) {
            matchCount++;
        }
    });

    const compatibility = (matchCount / jobWords.length) * 100;
    return compatibility.toFixed(2);
}
