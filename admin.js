// إعداد الاتصال بقاعدة البيانات (Supabase)
const supabaseUrl = 'https://krtofrjnxqfstmrwymwn.supabase.co/rest/v1/'
const supabaseKey = 'sb_publishable_7n2MPltuYxtfifSPQ7mxEQ_ZCM11bpe'
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// دالة تسجيل الدخول
async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        alert('خطأ في الإيميل أو كلمة المرور!');
        console.error(error);
    } else {
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('dashboard-section').style.display = 'block';
        getOrders(); // جلب الطلبات مباشرة بعد الدخول بنجاح
    }
}

// دالة تسجيل الخروج
async function logout() {
    await supabase.auth.signOut();
    document.getElementById('login-section').style.display = 'block';
    document.getElementById('dashboard-section').style.display = 'none';
}

// دالة إضافة منتج
async function addProduct() {
    const name = document.getElementById('prod-name').value;
    const price = document.getElementById('prod-price').value;

    if (!name || !price) {
        alert('المرجو إدخال اسم وثمن المنتج');
        return;
    }

    const { data, error } = await supabase
        .from('products') // تأكد أن اسم الجدول في Supabase هو products
        .insert([{ name: name, price: parseFloat(price) }]);

    if (error) {
        alert('وقع خطأ أثناء الإضافة');
        console.error(error);
    } else {
        alert('تمت إضافة المنتج بنجاح!');
        // تفريغ الخانات بعد الإضافة
        document.getElementById('prod-name').value = '';
        document.getElementById('prod-price').value = '';
    }
}

// دالة جلب الطلبات
async function getOrders() {
    const { data, error } = await supabase
        .from('orders') // تأكد أن اسم جدول الطلبات في Supabase هو orders
        .select('*');

    const list = document.getElementById('orders-list');
    list.innerHTML = ''; 
    
    if (error) {
        console.error("خطأ في جلب الطلبات:", error);
        return;
    }

    if (data && data.length > 0) {
        data.forEach(order => {
            const li = document.createElement('li');
            // تأكد أن أسماء الأعمدة (product_name و total) كطابق داكشي لي عندك في الجدول
            li.innerText = `رقم الطلب: ${order.id} | المنتج: ${order.product_name || 'غير محدد'} | الثمن: ${order.total || 0} درهم`;
            list.appendChild(li);
        });
    } else {
        list.innerHTML = '<li>لا توجد طلبات حاليا</li>';
    }
}