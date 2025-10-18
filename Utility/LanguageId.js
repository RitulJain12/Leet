const axios=require('axios');
module.exports.getLanguageId=(lang)=>{
    const language={
        "c++": 54,
        "java": 62,
      "javascript": 63,
       "python": 92 ,
       "kotlin":78  ,
       "c":50 ,
       "c#": 51,
        "php":98 ,
    }

    return language[lang.toLowerCase()];
}
module.exports.SubmitBatch= async (Submission)=>{
const options = {
  method: 'POST',
  url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
  params: {
    base64_encoded: 'true'
  },
  headers: {
    'x-rapidapi-key': 'e53db964b4msh8310cb74fd50146p1dfe08jsncdf9ec984de7',
    'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
    'Content-Type': 'application/json'
  },
  data: {Submission}
};

async function fetchData() {
	try {
		const response = await axios.request(options);
		 return response.data;
	} catch (error) {
		console.error(error);
	}
}

return await fetchData();

}