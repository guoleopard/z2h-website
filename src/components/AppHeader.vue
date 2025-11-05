<template>
  <header class="header">
    <nav class="nav">
      <div class="nav-brand">
        <router-link to="/" class="brand-link">Z2H字帖</router-link>
      </div>
      <ul class="nav-menu">
        <li><router-link to="/hanzi">语文字帖</router-link></li>
        <li class="dropdown">
          <a href="javascript:void(0)" class="dropdown-toggle">英文字帖</a>
          <ul class="dropdown-menu">
            <li><router-link to="/alphabet">字母字帖</router-link></li>
            <li><router-link to="/word">单词字帖</router-link></li>
            <li><router-link to="/paragraph">段落字帖</router-link></li>
          </ul>
        </li>
        <li><router-link to="/number">数字字帖</router-link></li>
        <li><router-link to="/pinyin">拼音字帖</router-link></li>
        <li><router-link to="/pen-control">控笔练习</router-link></li>
        <li><router-link to="/donate" class="donate-link">💝捐助</router-link></li>
        <li><router-link to="/login">登录</router-link></li>
        <li><router-link to="/membership" class="donate-link">会员购买</router-link></li>
        <li><router-link to="/invite" class="donate-link">邀请奖励</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
</script>

<style scoped>
.header {
  background: white;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}

.nav-brand .brand-link {
  font-size: 24px;
  font-weight: bold;
  color: #1f2937;
  text-decoration: none;
}

.nav-menu {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 32px;
}

.nav-menu a {
  color: #6b7280;
  text-decoration: none;
  font-size: 16px;
  transition: color 0.3s;
}

.nav-menu a:hover,
.nav-menu a.router-link-active {
  color: #1f2937;
}

/* 下拉菜单样式 */
.dropdown {
  position: relative;
}

.dropdown-toggle {
  color: #6b7280;
  text-decoration: none;
  font-size: 16px;
  transition: color 0.3s;
  cursor: pointer;
}

.dropdown-toggle:hover {
  color: #1f2937;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  list-style: none;
  margin: 0;
  padding: 8px 0;
  min-width: 160px;
  z-index: 101;
  display: none;
}

.dropdown:hover .dropdown-menu {
  display: block;
}

.dropdown-menu li {
  margin: 0;
  padding: 0;
}

.dropdown-menu a {
  display: block;
  padding: 8px 16px;
  color: #6b7280;
  text-decoration: none;
  font-size: 14px;
  transition: background-color 0.3s;
}

.dropdown-menu a:hover {
  background-color: #f3f4f6;
  color: #1f2937;
}

.donate-link {
  color: #ef4444 !important;
}

@media (max-width: 768px) {
  .nav {
    flex-direction: column;
    height: auto;
    padding: 16px 20px;
  }
  
  .nav-menu {
    flex-wrap: wrap;
    gap: 16px;
    justify-content: center;
    margin-top: 16px;
  }
}
</style>
