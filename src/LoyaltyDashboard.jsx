import React, { useState, useEffect } from "react";
import {
  Star,
  Gift,
  Wallet,
  ShoppingCart,
  Plus,
  Minus,
  Calendar,
  Award,
  TrendingUp,
} from "lucide-react";

const GoofyLoyaltyDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [userPoints, setUserPoints] = useState(1250);
  const [pointsHistory, setPointsHistory] = useState([
    {
      id: 1,
      type: "earned",
      points: 500,
      reason: "Signup Bonus",
      date: "2024-08-15",
      expiry: "2025-08-15",
    },
    {
      id: 2,
      type: "earned",
      points: 75,
      reason: "Product Purchase - Toy Car",
      date: "2024-08-10",
      expiry: "2024-11-10",
    },
    {
      id: 3,
      type: "earned",
      points: 100,
      reason: "Product Purchase - Kids Dress",
      date: "2024-08-05",
      expiry: "2024-11-05",
    },
    {
      id: 4,
      type: "redeemed",
      points: -200,
      reason: "Cashback Redemption",
      date: "2024-08-01",
      expiry: null,
    },
  ]);

  const [loyaltySettings, setLoyaltySettings] = useState({
    pointValue: 0.25, // 1 point = ₹0.25
    maxCartPercentage: 25,
    signupBonus: 500,
    signupBonusExpiry: 365, // days
  });

  const [products] = useState([
    {
      id: 1,
      name: "Super Racing Car Set",
      price: 1299,
      points: 65,
      category: "Toys",
      image: "🏎️",
    },
    {
      id: 2,
      name: "Princess Lehenga Set",
      price: 2499,
      points: 125,
      category: "Clothing",
      image: "👗",
    },
    {
      id: 3,
      name: "Educational Building Blocks",
      price: 1799,
      points: 90,
      category: "Toys",
      image: "🧱",
    },
    {
      id: 4,
      name: "Cotton Kurta Pajama Set",
      price: 899,
      points: 45,
      category: "Clothing",
      image: "👕",
    },
    {
      id: 5,
      name: "Remote Control Helicopter",
      price: 3499,
      points: 175,
      category: "Toys",
      image: "🚁",
    },
    {
      id: 6,
      name: "Traditional Ghagra Choli",
      price: 1999,
      points: 100,
      category: "Clothing",
      image: "👘",
    },
  ]);

  const [cart, setCart] = useState([]);
  const [showAddPoints, setShowAddPoints] = useState(false);
  const [showRemovePoints, setShowRemovePoints] = useState(false);

  // State for Add Points modal
  const [addPointsForm, setAddPointsForm] = useState({
    points: "",
    reason: "",
    expiry: "",
    remarks: "",
  });

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const calculateCartTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const calculateCartPoints = () => {
    return cart.reduce((total, item) => total + item.points, 0);
  };

  const calculateMaxRedeemablePoints = () => {
    const cartTotal = calculateCartTotal();
    const maxRedeemable = Math.floor(
      (cartTotal * loyaltySettings.maxCartPercentage) /
        100 /
        loyaltySettings.pointValue
    );
    return Math.min(maxRedeemable, userPoints);
  };

  // Handler for adding points
  const handleAddPoints = (e) => {
    e.preventDefault();
    const points = parseInt(addPointsForm.points);
    const reason = addPointsForm.reason;
    const expiry = addPointsForm.expiry;
    const remarks = addPointsForm.remarks;
    if (!points || !reason || !expiry) return;
    const newTransaction = {
      id: Date.now(),
      type: "earned",
      points,
      reason,
      date: new Date().toISOString().slice(0, 10),
      expiry,
      remarks,
    };
    setPointsHistory([newTransaction, ...pointsHistory]);
    setUserPoints((prev) => prev + points);
    setAddPointsForm({ points: "", reason: "", expiry: "", remarks: "" });
    setShowAddPoints(false);
  };

  // Add Points Modal
  const AddPointsModal = () =>
    showAddPoints && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-96 mx-4">
          <h3 className="text-xl font-bold mb-4 text-green-600">Add Points</h3>
          <form onSubmit={handleAddPoints}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Points to Add
                </label>
                <input
                  name="points"
                  type="number"
                  required
                  className="w-full p-2 border rounded-lg"
                  value={addPointsForm.points}
                  onChange={(e) =>
                    setAddPointsForm({
                      ...addPointsForm,
                      points: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Transaction For
                </label>
                <input
                  name="reason"
                  type="text"
                  required
                  className="w-full p-2 border rounded-lg"
                  placeholder="e.g., Product Purchase"
                  value={addPointsForm.reason}
                  onChange={(e) =>
                    setAddPointsForm({
                      ...addPointsForm,
                      reason: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Expiry Date
                </label>
                <input
                  name="expiry"
                  type="date"
                  required
                  className="w-full p-2 border rounded-lg"
                  value={addPointsForm.expiry}
                  onChange={(e) =>
                    setAddPointsForm({
                      ...addPointsForm,
                      expiry: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Remarks
                </label>
                <textarea
                  name="remarks"
                  className="w-full p-2 border rounded-lg"
                  placeholder="Additional notes..."
                  value={addPointsForm.remarks}
                  onChange={(e) =>
                    setAddPointsForm({
                      ...addPointsForm,
                      remarks: e.target.value,
                    })
                  }
                ></textarea>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button
                type="submit"
                className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
              >
                Add Points
              </button>
              <button
                type="button"
                onClick={() => setShowAddPoints(false)}
                className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );

  const RemovePointsModal = () =>
    showRemovePoints && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-96 mx-4">
          <h3 className="text-xl font-bold mb-4 text-red-600">Remove Points</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Points to Remove
              </label>
              <input
                type="number"
                value={removePointsForm.points}
                onChange={(e) =>
                  setRemovePointsForm({
                    ...removePointsForm,
                    points: e.target.value,
                  })
                }
                max={userPoints}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Transaction For
              </label>
              <input
                type="text"
                value={removePointsForm.reason}
                onChange={(e) =>
                  setRemovePointsForm({
                    ...removePointsForm,
                    reason: e.target.value,
                  })
                }
                className="w-full p-2 border rounded-lg"
                placeholder="e.g., Cashback Redemption"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Remarks</label>
              <textarea
                value={removePointsForm.remarks}
                onChange={(e) =>
                  setRemovePointsForm({
                    ...removePointsForm,
                    remarks: e.target.value,
                  })
                }
                className="w-full p-2 border rounded-lg"
                placeholder="Additional notes..."
              ></textarea>
            </div>
          </div>
          <div className="flex gap-2 mt-6">
            <button
              onClick={handleRemovePoints}
              className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
            >
              Remove Points
            </button>
            <button
              onClick={() => setShowRemovePoints(false)}
              className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b-4 border-purple-300">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-4xl">🤡</div>
              <div>
                <h1 className="text-3xl font-bold text-purple-600">Goofy</h1>
                <p className="text-gray-600">Kids Toys & Clothing Store</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-purple-100 px-6 py-3 rounded-full">
              <Star className="text-yellow-500 fill-current" size={24} />
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {userPoints.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Loyalty Points</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex gap-2 bg-white rounded-xl p-2 shadow-md">
          {[
            { id: "dashboard", label: "Dashboard", icon: TrendingUp },
            { id: "wallet", label: "Wallet", icon: Wallet },
            { id: "products", label: "Products", icon: Gift },
            { id: "cart", label: `Cart (${cart.length})`, icon: ShoppingCart },
            { id: "settings", label: "Settings", icon: Award },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                activeTab === tab.id
                  ? "bg-purple-500 text-white shadow-md"
                  : "text-gray-600 hover:bg-purple-100"
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 pb-8">
        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-purple-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Star className="text-purple-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Total Points</h3>
                    <p className="text-2xl font-bold text-purple-600">
                      {userPoints.toLocaleString()}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Value: ₹{(userPoints * loyaltySettings.pointValue).toFixed(2)}
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Gift className="text-green-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Signup Bonus</h3>
                    <p className="text-2xl font-bold text-green-600">
                      {loyaltySettings.signupBonus}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Expires in {loyaltySettings.signupBonusExpiry} days
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-orange-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-orange-100 p-3 rounded-full">
                    <TrendingUp className="text-orange-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Max Cart %</h3>
                    <p className="text-2xl font-bold text-orange-600">
                      {loyaltySettings.maxCartPercentage}%
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Maximum cashback per order
                </p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-lg border-2 border-blue-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-800">
                  Recent Activity
                </h3>
              </div>
              <div className="p-6">
                {pointsHistory.slice(0, 5).map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          transaction.type === "earned"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      ></div>
                      <div>
                        <p className="font-medium text-gray-800">
                          {transaction.reason}
                        </p>
                        <p className="text-sm text-gray-600">
                          {transaction.date}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`font-bold ${
                        transaction.type === "earned"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {transaction.points > 0 ? "+" : ""}
                      {transaction.points}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Wallet Tab */}
        {activeTab === "wallet" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-purple-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Points Wallet
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowAddPoints(true)}
                    className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <Plus size={18} />
                    Add Points
                  </button>
                  <button
                    onClick={() => setShowRemovePoints(true)}
                    className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <Minus size={18} />
                    Remove Points
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 px-2">Type</th>
                      <th className="text-left py-3 px-2">Points</th>
                      <th className="text-left py-3 px-2">Transaction For</th>
                      <th className="text-left py-3 px-2">Date</th>
                      <th className="text-left py-3 px-2">Expiry</th>
                      <th className="text-left py-3 px-2">Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pointsHistory.map((transaction) => (
                      <tr
                        key={transaction.id}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-3 px-2">
                          <span
                            className={`inline-block w-3 h-3 rounded-full mr-2 ${
                              transaction.type === "earned"
                                ? "bg-green-500"
                                : "bg-red-500"
                            }`}
                          ></span>
                          {transaction.type === "earned"
                            ? "Earned"
                            : "Redeemed"}
                        </td>
                        <td
                          className={`py-3 px-2 font-bold ${
                            transaction.type === "earned"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {transaction.points > 0 ? "+" : ""}
                          {transaction.points}
                        </td>
                        <td className="py-3 px-2">{transaction.reason}</td>
                        <td className="py-3 px-2">{transaction.date}</td>
                        <td className="py-3 px-2">
                          {transaction.expiry || "N/A"}
                        </td>
                        <td className="py-3 px-2 text-sm text-gray-600">
                          {transaction.remarks || "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === "products" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Featured Products
              </h2>
              <div className="space-y-4">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-4 border-2 border-gray-100 rounded-lg hover:border-purple-200 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">{product.image}</div>
                      <div>
                        <h3 className="font-bold text-gray-800">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {product.category}
                        </p>
                        <div className="flex items-center gap-1 bg-yellow-100 px-2 py-1 rounded-full mt-1 w-fit">
                          <Star
                            className="text-yellow-500 fill-current"
                            size={12}
                          />
                          <span className="text-xs font-bold text-yellow-600">
                            {product.points} Points Cashback
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right flex flex-col gap-2">
                      <p className="font-bold text-green-600 text-lg">
                        ₹{product.price}
                      </p>
                      <p className="text-sm text-purple-600 font-medium">
                        Earn {product.points} pts
                      </p>
                      <button
                        onClick={() => addToCart(product)}
                        className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors text-sm"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Cart Tab */}
        {activeTab === "cart" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-orange-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Shopping Cart
              </h2>

              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart
                    className="mx-auto text-gray-400 mb-4"
                    size={48}
                  />
                  <p className="text-gray-600">Your cart is empty</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 border-2 border-gray-100 rounded-lg hover:border-purple-200 transition-all"
                      >
                        <div className="flex items-center gap-4">
                          <div className="text-3xl">{item.image}</div>
                          <div>
                            <h3 className="font-bold text-gray-800">
                              {item.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {item.category}
                            </p>
                            <div className="flex items-center gap-1 bg-yellow-100 px-2 py-1 rounded-full mt-1 w-fit">
                              <Star
                                className="text-yellow-500 fill-current"
                                size={12}
                              />
                              <span className="text-xs font-bold text-yellow-600">
                                {item.points} Points Cashback
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600 text-lg">
                            ₹{item.price}
                          </p>
                          <p className="text-sm text-purple-600 font-medium">
                            Earn {item.points} pts
                          </p>
                          <button
                            onClick={() =>
                              setCart(cart.filter((_, i) => i !== index))
                            }
                            className="text-red-500 hover:text-red-700 text-sm mt-1"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t-2 border-gray-200 pt-6">
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg mb-4">
                      <h4 className="font-bold text-purple-600 mb-2 flex items-center gap-2">
                        <Gift className="text-purple-500" size={20} />
                        Points Summary
                      </h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            Total Points You'll Earn:
                          </span>
                          <span className="font-bold text-green-600">
                            +{calculateCartPoints()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Points Value:</span>
                          <span className="font-bold text-green-600">
                            ₹
                            {(
                              calculateCartPoints() * loyaltySettings.pointValue
                            ).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Subtotal:</span>
                          <span className="font-bold">
                            ₹{calculateCartTotal().toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="text-gray-600">
                            Max Redeemable Points:
                          </span>
                          <span className="font-bold text-orange-600">
                            {calculateMaxRedeemablePoints()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            Max Cashback ({loyaltySettings.maxCartPercentage}%):
                          </span>
                          <span className="font-bold text-purple-600">
                            ₹
                            {(
                              calculateMaxRedeemablePoints() *
                              loyaltySettings.pointValue
                            ).toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-200">
                        <h4 className="font-bold text-purple-600 mb-3 flex items-center gap-2">
                          <Wallet className="text-purple-500" size={18} />
                          Redeem Points
                        </h4>
                        <p className="text-sm text-gray-600 mb-3">
                          You can use up to{" "}
                          <span className="font-bold text-purple-600">
                            {calculateMaxRedeemablePoints()}
                          </span>{" "}
                          points (
                          <span className="font-bold text-green-600">
                            ₹
                            {(
                              calculateMaxRedeemablePoints() *
                              loyaltySettings.pointValue
                            ).toFixed(2)}
                          </span>
                          ) on this order
                        </p>
                        <div className="flex gap-2">
                          <input
                            type="number"
                            max={calculateMaxRedeemablePoints()}
                            placeholder="Points to use"
                            className="flex-1 p-2 border rounded-lg text-sm"
                          />
                          <button className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 text-sm">
                            Apply
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          Available points: {userPoints.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Loyalty Program Settings
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Point Value ($)
                    </label>
                    <input
                      type="number"
                      step="0.001"
                      value={loyaltySettings.pointValue}
                      onChange={(e) =>
                        setLoyaltySettings({
                          ...loyaltySettings,
                          pointValue: parseFloat(e.target.value),
                        })
                      }
                      className="w-full p-2 border rounded-lg"
                    />
                    <p className="text-sm text-gray-600 mt-1">
                      How much each point is worth in rupees
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Maximum Cart % (Capping)
                    </label>
                    <input
                      type="number"
                      max="100"
                      value={loyaltySettings.maxCartPercentage}
                      onChange={(e) =>
                        setLoyaltySettings({
                          ...loyaltySettings,
                          maxCartPercentage: parseInt(e.target.value),
                        })
                      }
                      className="w-full p-2 border rounded-lg"
                    />
                    <p className="text-sm text-gray-600 mt-1">
                      Maximum percentage of cart value that can be paid with
                      points
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Signup Bonus Points
                    </label>
                    <input
                      type="number"
                      value={loyaltySettings.signupBonus}
                      onChange={(e) =>
                        setLoyaltySettings({
                          ...loyaltySettings,
                          signupBonus: parseInt(e.target.value),
                        })
                      }
                      className="w-full p-2 border rounded-lg"
                    />
                    <p className="text-sm text-gray-600 mt-1">
                      Points awarded for new user registration
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Signup Bonus Expiry (Days)
                    </label>
                    <input
                      type="number"
                      value={loyaltySettings.signupBonusExpiry}
                      onChange={(e) =>
                        setLoyaltySettings({
                          ...loyaltySettings,
                          signupBonusExpiry: parseInt(e.target.value),
                        })
                      }
                      className="w-full p-2 border rounded-lg"
                    />
                    <p className="text-sm text-gray-600 mt-1">
                      Days until signup bonus points expire
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  Current Configuration
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="bg-purple-100 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      ₹{loyaltySettings.pointValue}
                    </div>
                    <div className="text-sm text-gray-600">Per Point</div>
                  </div>
                  <div className="bg-orange-100 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">
                      {loyaltySettings.maxCartPercentage}%
                    </div>
                    <div className="text-sm text-gray-600">Max Cart</div>
                  </div>
                  <div className="bg-green-100 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {loyaltySettings.signupBonus}
                    </div>
                    <div className="text-sm text-gray-600">Signup Bonus</div>
                  </div>
                  <div className="bg-blue-100 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {loyaltySettings.signupBonusExpiry}
                    </div>
                    <div className="text-sm text-gray-600">Days Expiry</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <AddPointsModal />
      <RemovePointsModal />
    </div>
  );
};

export default GoofyLoyaltyDashboard;
