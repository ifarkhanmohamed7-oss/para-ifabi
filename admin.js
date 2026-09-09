// ===============================
// PARA IFABI - ADMIN
// ===============================

// حط معلومات Supabase ديالك هنا
const supabaseUrl = 'https://krtofrjnxqfstmrwymwn.supabase.co/rest/v1/';
const supabaseKey = 'sb_publishable_7n2MPltuYxtfifSPQ7mxEQ_ZCM11bpe';

// إنشاء Supabase client
window.adminSupabase = window.supabase.createClient(
    supabaseUrl,
    supabaseKey
);


// ===============================
// LOGIN
// ===============================

window.login = async function () {

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (!email || !password) {
        alert('دخل الإيميل وكلمة المرور');
        return;
    }

    console.log('جاري تسجيل الدخول...');

    const { data, error } =
        await window.adminSupabase.auth.signInWithPassword({
            email: email,
            password: password
        });

    if (error) {
        console.error('Login error:', error);
        alert('خطأ: ' + error.message);
        return;
    }

    console.log('تم تسجيل الدخول بنجاح:', data);

    document.getElementById('login-section').style.display = 'none';
    document.getElementById('dashboard-section').style.display = 'block';

    getOrders();
};


// ===============================
// LOGOUT
// ===============================

window.logout = async function () {

    const { error } =
        await window.adminSupabase.auth.signOut();

    if (error) {
        console.error('Logout error:', error);
        return;
    }

    document.getElementById('login-section').style.display = 'block';
    document.getElementById('dashboard-section').style.display = 'none';
};


// ===============================
// ADD PRODUCT
// ===============================

window.addProduct = async function () {

    const name =
        document.getElementById('prod-name').value.trim();

    const price =
        document.getElementById('prod-price').value;

    if (!name || !price) {
        alert('دخل اسم وثمن المنتج');
        return;
    }

    const { data, error } =
        await window.adminSupabase
            .from('products')
            .insert([
                {
                    name: name,
                    price: parseFloat(price)
                }
            ]);

    if (error) {
        console.error('Product error:', error);
        alert('وقع خطأ: ' + error.message);
        return;
    }

    alert('تمت إضافة المنتج بنجاح ✅');

    document.getElementById('prod-name').value = '';
    document.getElementById('prod-price').value = '';
};


// ===============================
// GET ORDERS
// ===============================

window.getOrders = async function () {

    const list =
        document.getElementById('orders-list');

    list.innerHTML = '<li>جاري تحميل الطلبات...</li>';

    const { data, error } =
        await window.adminSupabase
            .from('orders')
            .select('*');

    if (error) {
        console.error('Orders error:', error);

        list.innerHTML =
            '<li>وقع خطأ في جلب الطلبات</li>';

        return;
    }

    list.innerHTML = '';

    if (!data || data.length === 0) {

        list.innerHTML =
            '<li>لا توجد طلبات حاليا</li>';

        return;
    }

    data.forEach(order => {

        const li = document.createElement('li');

        li.innerText =
            `رقم الطلب: ${order.id} | ` +
            `المنتج: ${order.product_name || 'غير محدد'} | ` +
            `الثمن: ${order.total || 0} درهم`;

        list.appendChild(li);
    });
};


// ===============================
// CHECK CURRENT SESSION
// ===============================

window.addEventListener('load', async function () {

    console.log('admin.js خدام ✅');

    const { data } =
        await window.adminSupabase.auth.getSession();

    if (data.session) {

        document.getElementById('login-section').style.display = 'none';

        document.getElementById('dashboard-section').style.display = 'block';

        getOrders();
    }
});