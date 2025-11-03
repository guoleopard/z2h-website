<template>
  <header class="header">
    <nav class="nav">
      <div class="nav-brand">
        <router-link to="/" class="brand-link">Z2H字帖</router-link>
      </div>
      <ul class="nav-menu">
        <li><router-link to="/hanzi">语文字帖</router-link></li>
        <li><router-link to="/alphabet">英文字帖</router-link></li>
        <li><router-link to="/number">数字字帖</router-link></li>
        <li><router-link to="/pinyin">拼音字帖</router-link></li>
        <li><router-link to="/pen-control">控笔练习</router-link></li>
        <li><router-link to="/donate" class="donate-link">💝捐助</router-link></li>
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
