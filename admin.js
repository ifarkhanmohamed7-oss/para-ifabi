// ===============================
// SUPABASE CONNECTION
// ===============================

const supabaseUrl = 'https://krtofrjnxqfstmrwymwn.supabase.co/rest/v1/';
const supabaseKey = 'sb_publishable_7n2MPltuYxtfifSPQ7mxEQ_ZCM11bpe';

window.adminSupabase = window.supabase.createClient(
    supabaseUrl,
    supabaseKey
);


// ===============================
// LOGIN
// ===============================

async function login() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (!email || !password) {
        alert('دخل الإيميل وكلمة المرور');
        return;
    }

    const { data, error } = await window.adminSupabase.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) {
        console.error('Login error:', error);
        alert('خطأ في الإيميل أو كلمة المرور: ' + error.message);
        return;
    }

    console.log('Login successful:', data);

    document.getElementById('login-section').style.display = 'none';
    document.getElementById('dashboard-section').style.display = 'block';

    getOrders();
}


// ===============================
// LOGOUT
// ===============================

async function logout() {
    const { error } = await window.adminSupabase.auth.signOut();

    if (error) {
        console.error('Logout error:', error);
        return;
    }

    document.getElementById('login-section').style.display = 'block';
    document.getElementById('dashboard-section').style.display = 'none';
}


// ===============================
// ADD PRODUCT
// ===============================

async function addProduct() {
    const name = document.getElementById('prod-name').value.trim();
    const price = document.getElementById('prod-price').value;

    if (!name || !price) {
        alert('المرجو إدخال اسم وثمن المنتج');
        return;
    }

    const { data, error } = await window.adminSupabase
        .from('products')
        .insert([
            {
                name: name,
                price: parseFloat(price)
            }
        ])
        .select();

    if (error) {
        console.error('Product error:', error);
        alert('وقع خطأ أثناء إضافة المنتج: ' + error.message);
        return;
    }

    console.log('Product added:', data);

    alert('تمت إضافة المنتج بنجاح!');

    document.getElementById('prod-name').value = '';
    document.getElementById('prod-price').value = '';
}


// ===============================
// GET ORDERS
// ===============================

async function getOrders() {
    const { data, error } = await window.adminSupabase
        .from('orders')
        .select('*');

    const list = document.getElementById('orders-list');

    list.innerHTML = '';

    if (error) {
        console.error('Orders error:', error);
        list.innerHTML = '<li>وقع خطأ في جلب الطلبات</li>';
        return;
    }

    if (data && data.length > 0) {

        data.forEach(order => {

            const li = document.createElement('li');

            li.innerText =
                `رقم الطلب: ${order.id} | المنتج: ${order.product_name || 'غير محدد'} | الثمن: ${order.total || 0} درهم`;

            list.appendChild(li);
        });

    } else {

        list.innerHTML = '<li>لا توجد طلبات حاليا</li>';

    }
}