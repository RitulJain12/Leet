const axios=require('axios');
async function stop() {
    setTimeout(()=>{
      return 1;
    },1000);
}
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
    base64_encoded: 'false'
  },
  headers: {
    'x-rapidapi-key': '859388a16bmsh196c85417941087p1cff80jsn87c2dad1cf8f',
    'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
    'Content-Type': 'application/json'
  },
  data: {submissions: Submission}
};

async function fetchData() {
	try {
		const response = await axios.request(options);
       // console.log(response.data);
		 return response.data;
	} catch (error) {
		console.error(error);
	}
}

return await fetchData();

}
module.exports.SubmitToken= async (Resulttoken)=>{
const options = {
  method: 'GET',
  url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
  params: {
    tokens: Resulttoken.join(","),
    base64_encoded: 'false',
    fields: '*'
  },
  headers: {
    'x-rapidapi-key': 'e53db964b4msh8310cb74fd50146p1dfe08jsncdf9ec984de7',
    'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
  }
};

async function fetchData() {
	try {
		const response = await axios.request(options);
	      return response.data;
	} catch (error) {
		console.error(error);
	}
}

 while(true){
    const Result =await fetchData();
    const IsPresent=Result.submissions.every((res)=> res.status_id>2);
   if(IsPresent) return Result.submissions;
     await stop();
    // console.log(Result.submissions);
 }
}