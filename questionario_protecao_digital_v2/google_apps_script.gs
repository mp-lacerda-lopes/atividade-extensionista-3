const SPREADSHEET_ID = "COLE_AQUI_O_ID_DA_PLANILHA";
const SHEET_NAME = "Respostas";
const QUESTION_IDS = ["two_factor","unique_passwords","password_manager","confirm_pix","click_links","share_codes","public_wifi","device_updates","ai_training","ai_diet","ai_symptoms","verify_ai","personal_data_ai","verify_media","backup"];
function setupSheet(){
 const ss=SpreadsheetApp.openById(SPREADSHEET_ID); let sh=ss.getSheetByName(SHEET_NAME)||ss.insertSheet(SHEET_NAME);
 const h=["Data e hora","Primeiro nome (opcional)","Faixa etária","Tempo de atividade física","Frequência de uso de IA","Pontuação (%)","Nível","Usa 2FA","Senhas diferentes","Gerenciador de senhas","Confirma Pix","Clica em links sem verificar","Compartilhou código","Evita banco em Wi-Fi público","Mantém atualizações","Treino por IA","Dieta por IA","Sintomas na IA","Confirma respostas da IA","Evita dados pessoais na IA","Verifica mídia","Mantém backup"];
 sh.clear(); sh.getRange(1,1,1,h.length).setValues([h]).setFontWeight("bold").setBackground("#101418").setFontColor("#c7ff46"); sh.setFrozenRows(1); sh.autoResizeColumns(1,h.length);
}
function doGet(){return json({ok:true,message:"API ativa"})}
function doPost(e){try{const d=JSON.parse(e.postData.contents); if(d.consent!==true)throw new Error("Consentimento ausente"); const p=d.participant||{},a=d.answers||{}; const sh=SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME); sh.appendRow([new Date(),safe(p.firstName),safe(p.ageGroup),safe(p.trainingTime),safe(p.aiUse),Number(d.score),safe(d.level),...QUESTION_IDS.map(id=>safe(a[id]))]); return json({ok:true});}catch(err){return json({ok:false,error:String(err.message||err)})}}
function safe(v){if(v==null)return "";let t=String(v).trim().substring(0,500);return /^[=+\-@]/.test(t)?"'"+t:t}
function json(o){return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON)}
