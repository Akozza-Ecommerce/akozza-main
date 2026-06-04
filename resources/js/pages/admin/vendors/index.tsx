import React from 'react'

export default function index({ vendors }) {
  return (
    <div>
      <h1>Vendors</h1>
      <ul>
        {vendors.map((vendor) => (
          <li key={vendor.id}>{vendor.name}</li>
        ))}
      </ul>
    </div>
  )
}
