const languageCodeMap = {
  cpp: 54, //Changed it from 53 to 54 cause 53 is archieved on judge0 server
  java: 62, //Changed it from 91 to 62 cause 91 is archieved on judge0 server
  javascript: 63,
  python: 71,
};

async function getSubmission(tokenId) {
  const url = `https://judge0-ce.p.rapidapi.com/submissions/${tokenId}?base64_encoded=true&fields=*`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "3a52d48a52mshcddf5db5992b5a2p1eeebbjsn2acbc5a5f192",
      "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching submission result:", error);
    return { error: error.message };
  }
}

export async function makeSubmission({ code, language, stdin, callback }) {
  const url =
    "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=false&fields=*";
  const httpOption = {
    method: "POST",
    headers: {
      "x-rapidapi-key": "3a52d48a52mshcddf5db5992b5a2p1eeebbjsn2acbc5a5f192",
      "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      language_id: languageCodeMap[language],
      source_code: btoa(code),
      stdin: btoa(stdin || ""),
    }),
  };

  try {
    callback({ apiStatus: "loading" });

    const response = await fetch(url, httpOption);
    const result = await response.json();

    const tokenId = result.token;
    if (!tokenId) {
      throw new Error(
        `Submission token not received. API response: ${JSON.stringify(result)}`
      );
    }

    let apiSubmissionResult = await getSubmission(tokenId);
    let statusCode = apiSubmissionResult?.status?.id ?? 1; // Default status to '1' (In Queue)

    while (statusCode === 1 || statusCode === 2) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      apiSubmissionResult = await getSubmission(tokenId);
      statusCode = apiSubmissionResult?.status?.id ?? 1;
    }

    const decodedOutput = apiSubmissionResult.stdout
      ? atob(apiSubmissionResult.stdout)
      : apiSubmissionResult.stderr
      ? atob(apiSubmissionResult.stderr)
      : "No Output";

    callback({
      apiStatus: "success",
      data: { ...apiSubmissionResult, decodedOutput },
    });
  } catch (error) {
    callback({
      apiStatus: "error",
      message: error.message,
    });
  }
}

