(async function() {
  const bubbleIconUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyyBcnn8TMHh0YRyHxeNzTlCVmLiw1YY6pgA&s';
  const autoBtnText = 'AUTO MUA MÁY TRIAL 4H';
  const host = document.createElement('div');
  host.id = 'ugphone-extension-host';
  const shadow = host.attachShadow({ mode: 'open' });
  document.body.appendChild(host);
  shadow.innerHTML = `
    <style>
      @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      .spinner { border: 2px solid #f3f3f3; border-top: 2px solid #3498db; border-radius: 50%; width: 12px; height: 12px; animation: spin 1s linear infinite; display: inline-block; vertical-align: middle; margin-right: 5px; }
      :host { all: initial; position: fixed; bottom: 0; right: 0; z-index: 9999; }
      #bubble { position: fixed; bottom: 20px; right: 20px; width: 60px; height: 60px; border-radius: 50%; background: transparent; background-image: url('${bubbleIconUrl}'); background-size: cover; background-repeat: no-repeat; background-position: center; cursor: grab; box-shadow: 0 2px 6px rgba(0,0,0,0.3); }
      #bubble:active { cursor: grabbing; }
      #overlay { position: fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.5); display:none; justify-content:center; align-items:center; }
      #modal { width:400px; padding:20px; background:#fff; border-radius:8px; box-shadow:0 2px 8px rgba(0,0,0,0.3); display:flex; flex-direction:column; gap:10px; }
      #modal h3 { margin:0 0 10px; }
      #message { min-height:1.2em; font-size:14px; color:#dc3545; }
      #modal textarea { width:100%; height:120px; padding:8px; font-family:monospace; }
      #modal .buttons { display:flex; justify-content:flex-end; gap:8px; }
      #modal button { padding:6px 12px; border:none; cursor:pointer; border-radius:4px; }
      #modal button#cancel  { background:#ccc;    color:#000; }
      #modal button#copy    { background:#28a745; color:#fff; }
      #modal button#submit  { background:#007bff; color:#fff; }
      #modal button#logout  { background:#dc3545; color:#fff; }
      .actions { display:flex; justify-content:center; margin-top:10px; }
      #auto-trial { padding:6px 12px; border:none; cursor:pointer; border-radius:4px; background:#ffc107; color:#000; }
      #modal footer#modal-footer {
  text-align: center;
  padding-top: 8px;
  font-size: 20px;
  
}

#modal footer#modal-footer a {
  color:rgb(150, 158, 165);         /* trắng xám */
  text-decoration: none;  /* bỏ gạch chân */
  transition: color 0.3s ease; /* hiệu ứng chuyển màu */
  font-size: 20px;       /* kích thước chữ nhỏ hơn */
}

#modal footer#modal-footer a:hover {
  color:rgb(191, 197, 202);         /* hover nhạt hơn */
}
    </style>
    <div id="bubble"></div>
    <div id="overlay">
      <div id="modal">
        <h3>AUTO UGPHONE</h3>
        <div id="message"></div>
        <textarea id="input" placeholder='Nhập localstorage json'></textarea>
        <div class="buttons">
          <button id="submit">Đăng nhập</button>
          <button id="logout">Đăng xuất</button>  
          <button id="cancel" style="margin-left: auto";>Hủy bỏ</button>
        </div>
        <div class="buttons">
          <button id="copy" style="flex: 0 0 100%;">Sao chép localStorage</button>
        </div>
        <div class="actions">
          <button id="auto-trial">${autoBtnText}</button>
        </div>
        <footer id="modal-footer">
          <a href="https://t.me/Android_mod_vip" target="_blank" >MAKE BY : TÚ NGUYỄN</a>
          <br>
          <p>VIỆC THAY ĐỔI MÃ NGUỒN VÀ ĐEM ĐI SHARE MÀ KO CÓ SỰ CHO PHÉP CỦA TÁC GIẢ LÀ HÀNH VI KHÔNG TÔN TRỌNG QUYỀN SỞ HŨU TRÍ TUỆ VÀ HOÀN TOÀN BỊ NGHIÊM CẤM.</p>
        </footer>
      </div>
    </div>
  `;
  const bubble   = shadow.querySelector('#bubble');
  const overlay  = shadow.querySelector('#overlay');
  const messageEl= shadow.querySelector('#message');
  const btnCancel= shadow.querySelector('#cancel');
  const btnCopy  = shadow.querySelector('#copy');
  const btnSubmit= shadow.querySelector('#submit');
  const btnLogout= shadow.querySelector('#logout');
  const btnAuto  = shadow.querySelector('#auto-trial');
  const txtArea  = shadow.querySelector('#input');
  function showMessage(msg, isError=true) {
    messageEl.style.color = isError ? '#dc3545' : '#28a745';
    messageEl.textContent = msg;
    setTimeout(() => { if (messageEl.textContent === msg) messageEl.textContent = ''; }, 4000);
  }
  let isDragging=false, offsetX=0, offsetY=0;
  bubble.addEventListener('mousedown', e => {
    e.preventDefault(); const rect=bubble.getBoundingClientRect();
    bubble.style.left=rect.left+'px'; bubble.style.top=rect.top+'px'; bubble.style.bottom='auto'; bubble.style.right='auto';
    isDragging=true; offsetX=e.clientX-rect.left; offsetY=e.clientY-rect.top;
  });
  document.addEventListener('mousemove', e=>{ if(!isDragging)return; bubble.style.left=(e.clientX-offsetX)+'px'; bubble.style.top=(e.clientY-offsetY)+'px'; });
  document.addEventListener('mouseup', ()=>{ isDragging=false; });
  bubble.addEventListener('click', ()=>overlay.style.display='flex');
  btnCancel.addEventListener('click', ()=>{ overlay.style.display='none'; messageEl.textContent=''; });
  btnCopy.addEventListener('click', ()=>{
    const data={}; for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);data[k]=localStorage.getItem(k);}  
    const json=JSON.stringify(data,null,2);
    (navigator.clipboard?.writeText? navigator.clipboard.writeText(json) : new Promise((res,rej)=>{const ta=document.createElement('textarea');ta.value=json;document.body.appendChild(ta);ta.select();try{document.execCommand('copy');res();}catch(e){rej(e);}document.body.removeChild(ta);})).then(()=>showMessage('Đã copy localStorage',false)).catch(e=>showMessage('Copy thất bại',true));
  });
  btnSubmit.addEventListener('click', ()=>{
    const text=txtArea.value.trim(); if(!text){showMessage('Vui lòng nhập JSON');return;} let obj;
    try{obj=JSON.parse(text);}catch(e){showMessage('JSON không hợp lệ',true);return;}
    Object.entries(obj).forEach(([k,v])=>localStorage.setItem(k,typeof v==='object'?JSON.stringify(v):String(v)));
    showMessage('Đã import localStorage',false);
    setTimeout(()=>{overlay.style.display='none';location.reload();window.location.href='https://www.ugphone.com/toc-portal/#/dashboard/index';},500);
  });
  btnLogout.addEventListener('click', ()=>{
    if(true){localStorage.clear();showMessage('Đã logout',false);setTimeout(()=>{overlay.style.display='none';location.reload();},500);}  
  });
   function xhrRequest(method, url, data, headers) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url, true);
      xhr.withCredentials = true;
      for (const key in headers) {
        xhr.setRequestHeader(key, headers[key]);
      }
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              resolve(JSON.parse(xhr.responseText));
            } catch (e) {
              reject(e);
            }
          } else {
            reject(new Error('Status '+xhr.status));
          }
        }
      };
      xhr.send(data ? JSON.stringify(data) : null);
    });
  }
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  btnAuto.addEventListener('click', async () => {
    if (btnAuto.disabled) return;
    btnAuto.disabled = true;
    btnAuto.style.background = '#28a745';
    btnAuto.innerHTML = '<span class="spinner"></span>' + autoBtnText;
    try {
      const mqtt = JSON.parse(localStorage.getItem('UGPHONE-MQTT') || '{}');
      const headers = {
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
        'content-type': 'application/json;charset=UTF-8',
        'lang': 'vi',
        'terminal': 'web',
        'access-token': mqtt.access_token,
        'login-id': mqtt.login_id
      };
      await xhrRequest('POST', 'https://www.ugphone.com/api/apiv1/fee/newPackage', {}, headers);
      const json1 = await xhrRequest('GET', 'https://www.ugphone.com/api/apiv1/info/configList2', null, headers);
      console.log('configList2 response:', json1);
      let list1 = Array.isArray(json1.data?.list) ? json1.data.list : json1.data;
      if (!Array.isArray(list1)) {
        const arr = Object.values(json1.data || {}).find(v => Array.isArray(v));
        list1 = Array.isArray(arr) ? arr : [];
      }
      if (!list1.length || !Array.isArray(list1[0].android_version) || !list1[0].android_version.length) throw new Error('Không lấy được config_id');
      const config_id = list1[0].android_version[0].config_id;
      const json2 = await xhrRequest('POST', 'https://www.ugphone.com/api/apiv1/info/mealList', { config_id }, headers);
      let subscriptions = [];
      let subData = json2.data?.list;
      if (Array.isArray(subData)) subscriptions = subData.flatMap(i => i.subscription || []);
      else if (subData?.subscription) subscriptions = subData.subscription;
      if (!subscriptions.length) throw new Error('Không lấy được subscription');
      let success = false;
      while (!success) {
        for (const net_id of subscriptions.map(o => o.network_id)) {
          const priceJson = await xhrRequest('POST', 'https://www.ugphone.com/api/apiv1/fee/queryResourcePrice', {
            order_type: 'newpay', period_time: '4', unit: 'hour', resource_type: 'cloudphone',
            resource_param: { pay_mode: 'subscription', config_id, network_id: net_id, count: 1, use_points: 3, points: 250 }
          }, headers);
          const amount_id = priceJson.data?.amount_id;
          if (!amount_id) continue;
          sleep(1000); 
          const payJson = await xhrRequest('POST', 'https://www.ugphone.com/api/apiv1/fee/payment', { amount_id, pay_channel: 'free' }, headers);
          if (payJson.code === 200) { showMessage('Đã mua thành công', false);success = true;location.reload(); break; }
        }
      }
    } catch (e) {
      console.error(e);
      showMessage('Lỗi: ' + e.message, true);
    } finally {
      btnAuto.disabled = false;
      btnAuto.style.background = '#ffc107';
      btnAuto.textContent = autoBtnText;
    }
  });
})();
