import Map "mo:core/Map";
import List "mo:core/List";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Iter "mo:core/Iter";
import Migration "migration";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

(with migration = Migration.run)
actor {
  public type ProductInfo = {
    id : Nat;
    category : Text;
    title : Text;
    description : Text;
    priceCents : Nat;
    imageUrl : Text;
    stock : Nat;
  };

  public type CartItem = {
    productId : Nat;
    quantity : Nat;
  };

  public type Order = {
    principal : Principal;
    items : [CartItem];
    totalCents : Nat;
    timestamp : Time.Time;
    orderId : Nat;
  };

  public type UserProfile = {
    name : Text;
    // Other user metadata if needed
  };

  var nextOrderId = 1;
  let accessControlState = AccessControl.initState();

  let userProfiles = Map.empty<Principal, UserProfile>();
  let orders = List.empty<Order>();

  include MixinAuthorization(accessControlState);

  public query ({ caller }) func getAllOrders() : async [Order] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can fetch all orders");
    };
    orders.reverse().toArray();
  };

  public query ({ caller }) func getOrder(orderId : Nat) : async Order {
    switch (orders.find(func(o) { o.orderId == orderId })) {
      case (null) { Runtime.trap("Order not found") };
      case (?order) {
        if (
          not AccessControl.isAdmin(accessControlState, caller)
          and order.principal != caller
        ) {
          Runtime.trap("You are not allowed to retrieve this order");
        };
        order;
      };
    };
  };

  public shared ({ caller }) func createOrder(items : [CartItem], totalCents : Nat) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create orders");
    };

    let order : Order = {
      principal = caller;
      items;
      totalCents;
      timestamp = Time.now();
      orderId = nextOrderId;
    };

    orders.add(order); // Add to front of the list for reverse order

    nextOrderId += 1;

    order.orderId;
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can fetch their own profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };
};
