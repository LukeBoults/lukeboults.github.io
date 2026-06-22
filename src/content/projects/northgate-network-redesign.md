---
title: Northgate Network Redesign
description: Redesigned a flat, unstructured company network into a segmented,
  scalable architecture for a Brisbane-based office supplies business with six
  departments. The original network had all devices on a single /24 subnet with
  no segmentation.
image: /Images/ciscoproject_thumb.png
date: 2026-04-02T14:22:00.000+10:00
category: cybersecurity
gallery:
  - /Images/ciscoproject_thumb.png
  - /Images/ciscoisp.png
  - /Images/image_2026-06-22_191629608.png
---
**Subject: IFN658 — Networks and Security**

**Type: Group Project**

**Tools: Cisco Packet Tracer, IPv4 Subnetting (VLSM), Static Routing**

**Overview**

Redesigned a flat, unstructured company network into a segmented, scalable architecture for a Brisbane-based office supplies business with six departments. The original network had all devices on a single /24 subnet with no segmentation — a common real-world problem in organisations that grow without a formal network plan.

**What I Did**

Designed a full VLSM subnetting scheme across the 10.33.64.0/24 address space, allocating department-specific subnets ranging from /26 (Sales, 50 hosts) down to /29 (Executive Management, 6 hosts), with /30 point-to-point links between 8 routers
Built and configured the entire network in Cisco Packet Tracer, including router interfaces, end device addressing, default gateways, and static routing across a hierarchical topology
Configured efficient static routing using a mix of summary routes and default routes to minimise configuration overhead while maintaining full inter-departmental and internet connectivity
Proposed a future infrastructure upgrade plan including centralised DHCP (with relay configuration across subnets) and internal DNS services, with justification for a dedicated server subnet

**Key Skills Demonstrated**

IPv4 addressing and subnetting, VLSM design, Cisco Packet Tracer, hierarchical network topology, static routing, DHCP relay, DNS planning, technical report writing



**If you'd like to check out the packter tracer file yourself, it can be found at the link below**

https://drive.google.com/file/d/15eFaCXJkV6sh3O-iM0En59PkumAqAXqI/view?usp=sharing
