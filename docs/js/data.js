// ── Data Constants ──
const JOB_DATA = [
  { id:1, title:"Senior ML Engineer", company:"Google", location:"Bangalore", level:"Senior", skills:["Python","TensorFlow","Kubernetes","MLOps","GCP"], match:94, source:"LinkedIn", posted:"1d" },
  { id:2, title:"Frontend Developer", company:"Razorpay", location:"Remote", level:"Junior", skills:["React","TypeScript","CSS","Jest","Figma"], match:87, source:"Naukri", posted:"2d" },
  { id:3, title:"Data Analyst Intern", company:"Swiggy", location:"Hyderabad", level:"Intern", skills:["SQL","Python","Tableau","Excel"], match:79, source:"Unstop", posted:"1d" },
  { id:4, title:"Backend Engineer", company:"Atlassian", location:"Remote", level:"Mid", skills:["Java","Spring Boot","PostgreSQL","Docker","Redis"], match:82, source:"LinkedIn", posted:"3d" },
  { id:5, title:"DevOps Lead", company:"Microsoft", location:"Pune", level:"Senior", skills:["Kubernetes","Terraform","AWS","CI/CD","Python"], match:71, source:"LinkedIn", posted:"1d" },
  { id:6, title:"Full Stack Developer", company:"Flipkart", location:"Bangalore", level:"Mid", skills:["React","Node.js","MongoDB","GraphQL","Docker"], match:85, source:"Naukri", posted:"4d" },
  { id:7, title:"Data Scientist", company:"PhonePe", location:"Bangalore", level:"Mid", skills:["Python","R","ML","Statistics","Spark"], match:76, source:"LinkedIn", posted:"2d" },
  { id:8, title:"iOS Developer", company:"CRED", location:"Remote", level:"Junior", skills:["Swift","SwiftUI","Xcode","CoreData","REST APIs"], match:45, source:"Naukri", posted:"5d" },
  { id:9, title:"Cloud Architect", company:"Infosys", location:"Chennai", level:"Senior", skills:["AWS","Azure","GCP","Terraform","Security"], match:63, source:"Naukri", posted:"3d" },
  { id:10, title:"ML Research Intern", company:"Adobe", location:"Noida", level:"Intern", skills:["Python","PyTorch","Research","Linear Algebra","Computer Vision"], match:88, source:"Unstop", posted:"1d" },
  { id:11, title:"Product Analyst", company:"Meesho", location:"Bangalore", level:"Junior", skills:["SQL","Python","Analytics","Excel","Product Sense"], match:81, source:"LinkedIn", posted:"6d" },
  { id:12, title:"Security Engineer", company:"Zscaler", location:"Remote", level:"Senior", skills:["Cybersecurity","Python","SIEM","Penetration Testing","Cloud"], match:55, source:"LinkedIn", posted:"2d" },
  { id:13, title:"React Native Developer", company:"Ola", location:"Bangalore", level:"Mid", skills:["React Native","JavaScript","Redux","Firebase","TypeScript"], match:78, source:"Naukri", posted:"4d" },
  { id:14, title:"Data Engineer", company:"Juspay", location:"Remote", level:"Mid", skills:["Python","Spark","Airflow","SQL","Kafka"], match:83, source:"LinkedIn", posted:"3d" },
  { id:15, title:"SDE Intern", company:"Zepto", location:"Mumbai", level:"Intern", skills:["DSA","Java","System Design","SQL","Git"], match:72, source:"Unstop", posted:"1d" },
  { id:16, title:"AI Engineer", company:"Sarvam AI", location:"Bangalore", level:"Mid", skills:["Python","LLMs","LangChain","Vector DBs","FastAPI"], match:91, source:"LinkedIn", posted:"12h" },
  { id:17, title:"Backend Intern", company:"Groww", location:"Hyderabad", level:"Intern", skills:["Go","PostgreSQL","REST APIs","Docker","Git"], match:67, source:"Unstop", posted:"2d" },
  { id:18, title:"UI/UX Designer", company:"Zoho", location:"Chennai", level:"Junior", skills:["Figma","Framer","CSS","Prototyping","User Research"], match:39, source:"Naukri", posted:"5d" },
  { id:19, title:"Platform Engineer", company:"Razorpay", location:"Remote", level:"Senior", skills:["Kubernetes","Golang","Prometheus","Terraform","Linux"], match:70, source:"LinkedIn", posted:"3d" },
  { id:20, title:"NLP Engineer", company:"Sarvam AI", location:"Bangalore", level:"Senior", skills:["Python","NLP","Transformers","PyTorch","Hugging Face"], match:89, source:"LinkedIn", posted:"6h" }
];

const SKILL_DEMAND = [
  { name:'Python', percentage:68, color:'#7c3aed', weeks:4, demand:'HIGH' },
  { name:'JavaScript', percentage:61, color:'#06b6d4', weeks:3, demand:'MEDIUM' },
  { name:'SQL', percentage:57, color:'#10b981', weeks:2, demand:'MEDIUM' },
  { name:'React', percentage:49, color:'#f59e0b', weeks:4, demand:'HIGH' },
  { name:'Machine Learning', percentage:43, color:'#a78bfa', weeks:12, demand:'HIGH' },
  { name:'AWS', percentage:41, color:'#38bdf8', weeks:8, demand:'HIGH' },
  { name:'Docker', percentage:38, color:'#34d399', weeks:3, demand:'MEDIUM' },
  { name:'Java', percentage:35, color:'#fb923c', weeks:6, demand:'MEDIUM' },
  { name:'TypeScript', percentage:31, color:'#e879f9', weeks:3, demand:'MEDIUM' },
  { name:'Kubernetes', percentage:27, color:'#f87171', weeks:6, demand:'HIGH' }
];

const ROLE_TEMPLATES = {
  "Machine Learning Engineer": ["Python","TensorFlow","PyTorch","Scikit-learn","MLOps","Docker","Kubernetes","SQL","Git","Statistics"],
  "Frontend Developer": ["JavaScript","TypeScript","React","CSS","HTML","Webpack","Jest","Figma","REST APIs","Git"],
  "Data Scientist": ["Python","R","SQL","Statistics","ML","Pandas","NumPy","Tableau","Jupyter","Spark"],
  "Backend Engineer": ["Java","Spring Boot","Node.js","SQL","PostgreSQL","Docker","Redis","REST APIs","System Design","Git"],
  "DevOps Engineer": ["Linux","Docker","Kubernetes","Terraform","CI/CD","AWS","Python","Bash","Monitoring","Git"],
  "Full Stack Developer": ["React","Node.js","JavaScript","MongoDB","SQL","Docker","REST APIs","TypeScript","Git","AWS"],
  "Data Analyst": ["SQL","Python","Excel","Tableau","Power BI","Statistics","Data Cleaning","Pandas","Visualization","Communication"],
  "AI/LLM Engineer": ["Python","LLMs","LangChain","Hugging Face","Vector DBs","FastAPI","Prompt Engineering","PyTorch","RAG","Git"],
  "Cloud Architect": ["AWS","Azure","GCP","Terraform","Kubernetes","Security","Networking","Cost Optimization","Docker","Python"],
  "Android Developer": ["Kotlin","Java","Android SDK","Jetpack Compose","Firebase","REST APIs","Git","MVVM","Coroutines","Testing"]
};

const TREND_DATA = {
  "Python": [72,74,73,76,78,79,81,83],
  "JavaScript": [68,67,69,68,70,71,70,72],
  "SQL": [61,62,60,63,62,64,63,65],
  "React": [52,54,53,56,55,58,57,60],
  "Machine Learning": [40,43,45,44,47,49,52,55],
  "AWS": [44,45,44,46,45,47,48,49],
  "Docker": [38,39,41,40,42,43,44,45],
  "TypeScript": [30,32,33,35,36,38,40,43],
  "Go": [18,19,20,21,22,23,25,27],
  "Rust": [8,9,9,10,11,12,13,15]
};

const FALLBACK_NEWS = [
  { title:"Google DeepMind releases Gemini 2.0 with real-time multimodal reasoning", source:"TechCrunch", category:"AI", time:"1h ago", readTime:"4 min", description:"The new model achieves state-of-the-art on 30+ benchmarks and introduces native tool use..." },
  { title:"Vercel announces v0.dev 3.0 with full-stack generation from prompts", source:"The Verge", category:"Web Dev", time:"3h ago", readTime:"3 min", description:"The latest update allows developers to generate complete Next.js apps with database schemas..." },
  { title:"Meta open-sources Llama 4 with 128K context window", source:"Wired", category:"AI", time:"5h ago", readTime:"5 min", description:"Meta's latest open-source model beats GPT-4o on several code and reasoning benchmarks..." },
  { title:"AWS announces 40% price cut on EC2 GPU instances", source:"InfoQ", category:"Cloud", time:"8h ago", readTime:"2 min", description:"Amazon Web Services reduces pricing on P4d and P5 instances, making ML training more accessible..." },
  { title:"Rust overtakes Python in systems programming adoption survey", source:"Stack Blog", category:"Languages", time:"12h ago", readTime:"4 min", description:"The annual developer survey reveals Rust has become the preferred language for new systems projects..." },
  { title:"OpenAI's o3 model now available in ChatGPT free tier", source:"The Verge", category:"AI", time:"1d ago", readTime:"3 min", description:"OpenAI rolls out its most capable reasoning model to all users, with rate limits for free accounts..." },
  { title:"GitHub Copilot Workspace exits beta with agent mode", source:"GitHub Blog", category:"DevTools", time:"1d ago", readTime:"5 min", description:"GitHub's AI coding environment now supports autonomous multi-file refactoring and test generation..." },
  { title:"NVIDIA announces Blackwell Ultra GPU architecture at GTC 2025", source:"AnandTech", category:"Hardware", time:"2d ago", readTime:"6 min", description:"The new architecture promises 3x performance-per-watt improvement over the Hopper generation..." }
];

const TREND_COLORS = ['#7c3aed','#06b6d4','#10b981','#f59e0b','#a78bfa','#38bdf8','#34d399','#fb923c','#e879f9','#f87171'];
