import React from 'react'

const user = {
  name: 'Sara Bekele',
  email: 'sara.bekele@example.com',
  phone: '+251 91 234 5678',
  address: 'Bole Road, Addis Ababa',
  memberSince: 'March 2024',
  initials: 'SB',
}

const stats = [
  { label: 'Orders', value: 27 },
  { label: 'Favorites', value: 9 },
  { label: 'Reviews', value: 12 },
]

const orders = [
  {
    id: '#AE-2291',
    date: 'Sep 3, 2026',
    items: 'Doro Wat, Shiro',
    total: '$25.50',
    status: 'Delivered',
    emoji: '🍛',
    c1: '#C73E1D',
    c2: '#7A1F0A',
  },
  {
    id: '#AE-2214',
    date: 'Aug 22, 2026',
    items: 'Tibs Platter',
    total: '$16.00',
    status: 'Delivered',
    emoji: '🍲',
    c1: '#3F5A21',
    c2: '#7A1F0A',
  },
  {
    id: '#AE-2170',
    date: 'Aug 9, 2026',
    items: 'Shiro, Injera x2',
    total: '$18.75',
    status: 'Delivered',
    emoji: '🥘',
    c1: '#E5A50A',
    c2: '#9C2F15',
  },
]

function ProfilePage() {
  return (
    <div className="profile-page-wrapper">
      <div className="profile-page-container">
        {/* header */}
        <div className="profile-header">
          <div className="profile-header__avatar">{user.initials}</div>
          <div className="profile-header__info">
            <h1 className="section-title">{user.name}</h1>
            <p className="profile-header__meta">
              Member since {user.memberSince}
            </p>
          </div>
          <button type="button" className="btn btn--ghost profile-header__edit" disabled>
            Edit Profile
          </button>
        </div>

        {/* stats */}
        <ul className="profile-stats">
          {stats.map((s) => (
            <li key={s.label} className="profile-stats__item">
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </li>
          ))}
        </ul>

        <div className="profile-layout">
          {/* account details */}
          <section className="profile-card">
            <h3 className="profile-card__title">Account Details</h3>

            <div className="profile-field">
              <span className="profile-field__label">Full Name</span>
              <span className="profile-field__value">{user.name}</span>
            </div>
            <div className="profile-field">
              <span className="profile-field__label">Email Address</span>
              <span className="profile-field__value">{user.email}</span>
            </div>
            <div className="profile-field">
              <span className="profile-field__label">Phone Number</span>
              <span className="profile-field__value">{user.phone}</span>
            </div>
            <div className="profile-field">
              <span className="profile-field__label">Delivery Address</span>
              <span className="profile-field__value">{user.address}</span>
            </div>

            <button type="button" className="btn btn--ghost profile-card__signout" disabled>
              Sign Out
            </button>
          </section>

          {/* order history */}
          <section className="profile-card profile-card--orders">
            <h3 className="profile-card__title">Recent Orders</h3>

            <div className="profile-orders">
              {orders.map((order) => (
                <div className="profile-order" key={order.id}>
                  <div
                    className="profile-order__media"
                    style={{ '--c1': order.c1, '--c2': order.c2 }}
                  >
                    <span>{order.emoji}</span>
                  </div>

                  <div className="profile-order__body">
                    <div className="profile-order__head">
                      <span className="profile-order__id">{order.id}</span>
                      <span className="profile-order__total">{order.total}</span>
                    </div>
                    <p className="profile-order__items">{order.items}</p>
                    <div className="profile-order__foot">
                      <span className="profile-order__date">{order.date}</span>
                      <span className="profile-order__status">{order.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <a href="#" className="link-arrow profile-orders__more">
              View all orders →
            </a>
          </section>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage