import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';


import { color } from "framer-motion";
import "./style.scss";
const TermsAndConditions = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo === "terms") {
      const target = document.getElementById("terms");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);
  return (
    <section id="terms" className="legal-page">
      <div className="container">
        <h2 >Terms & Conditions</h2>
        <br />
        <strong className="legal-page-date">Last updated: 04/12/2025</strong>
        <br />
        <br />
        <p>
          These Terms of Service (the “Terms”) constitute a legally binding and
          enforceable agreement between Cierta Corporation, and you, the
          individual or entity (hereinafter referred to as "you," "your," or
          "the user") accessing or using Cierta’s freight forwarding, logistics,
          and transportation services. By accessing, browsing, registering, or
          using the services provided by Cierta (collectively referred to as
          "the Services"), you irrevocably acknowledge, accept, and agree to be
          bound by these Terms, including all amendments, modifications, and
          supplements thereto, as well as any applicable laws, statutory
          regulations, and standards governing transportation, trade, and
          logistics operations both domestically and internationally.
          <br />
          <br />
          Cierta Corporation, along with its subsidiaries, affiliates, officers,
          directors, employees, agents, and representatives (collectively
          referred to as "Cierta," "we," "our," or "us") is a provider of
          integrated freight forwarding and logistics solutions. These services
          are tailored to businesses and individuals involved in the movement of
          goods across various geographic regions, offering a comprehensive
          suite of offerings that includes but are not limited to: ocean, air,
          and ground transportation, warehousing, customs brokerage, and
          international regulatory compliance facilitation.
          <br />
          <br />
          By continuing to access or use the Services, whether as a registered
          user or a guest, you explicitly agree to comply with these Terms.
          Furthermore, by using the Services, you acknowledge that if you do not
          fully understand, accept, or consent to the Terms and Conditions, any
          resulting consequences shall be your sole responsibility. You agree to
          indemnify and hold harmless the provider from any liabilities arising
          therefrom. Your use of the Services following the publication of any
          modifications, updates, or revisions to these Terms will constitute
          your binding acceptance of such changes. You further acknowledge and
          agree that your use of the Services is subject to your adherence to
          these Terms and the conditions established therein.
          <br />
          <br />
          Cierta retains the sole discretion to amend, revise, update, or
          otherwise modify these Terms at any time without prior notice, and
          such modifications will be effective immediately upon posting to our
          website or notifying you directly through any of the means of
          communication available. Continued use of the Services
          post-modification will indicate your acceptance of the revised Terms.
        </p>

        <h2>Definitions</h2>
        <p>
          <strong>Account Information:</strong> Refers to the personal,
          corporate, and financial data provided by you in order to create,
          maintain, and access your account with Cierta. This information
          includes, but is not limited to, identification details, billing
          information, payment details, and shipping preferences. The accuracy,
          truthfulness, and completeness of the Account Information are of
          paramount importance to ensure the smooth provision of the Services.
        </p>

        <p>
          <strong>Bill of Lading:</strong> A legally binding document or written
          contract that serves as evidence of the agreement between Cierta (or a
          Third-Party Provider) and the shipper for the transportation of cargo.
          The BOL includes, but is not limited to, the specific terms,
          conditions, origin and destination addresses, description of goods,
          weight, packaging, and handling requirements. This document is
          fundamental in establishing the terms of the freight transport and
          outlines the obligations of all parties involved in the logistics
          chain.
        </p>

        <p>
          <strong>Carrier:</strong> Refers to any third-party transportation
          entity, including but not limited to ocean freight lines, air
          carriers, trucking companies, rail providers, and other transportation
          service providers that are contracted by Cierta to facilitate the
          physical movement of cargo from origin to destination. The term also
          encompasses any subcontractors or agents hired by the Carrier to
          perform specific duties in connection with the transportation of
          goods.
        </p>

        <p>
          <strong>Customs Broker:</strong> An individual or organization,
          authorized and licensed by the appropriate governmental authorities,
          responsible for assisting in the clearance of goods through customs
          and border control in compliance with applicable laws and regulations.
          A Customs Broker ensures that all necessary documentation, such as
          commercial invoices, declarations, and certificates, are accurately
          submitted and that applicable duties, taxes, and fees are settled in
          accordance with jurisdictional requirements.
        </p>

        <p>
          <strong>Dangerous Goods:</strong> Any items, substances, or materials
          that are classified as hazardous, harmful, or otherwise subject to
          specific regulations for transport due to their potential risk to
          public safety, health, or the environment. These goods require special
          handling, packaging, and documentation, and may be subject to various
          international regulations, including but not limited to IATA
          (International Air Transport Association), IMDG (International
          Maritime Dangerous Goods), and DOT (Department of Transportation)
          rules.
        </p>

        <p>
          <strong>Force Majeure:</strong> Refers to an event or series of events
          beyond the reasonable control of either party to this agreement,
          preventing or hindering the performance of contractual obligations.
          Such events include, but are not limited to, natural disasters (such
          as hurricanes, earthquakes, or floods), war, terrorism, riot,
          government interventions or sanctions, pandemics, labor strikes, cyber
          incidents, and any other circumstance that could reasonably be deemed
          unforeseeable and unavoidable under normal business conditions.
        </p>

        <p>
          <strong>Freight Forwarding:</strong> The management, coordination, and
          facilitation of the transportation, storage, and delivery of goods
          between locations, as arranged by Cierta on behalf of its clients.
          Freight forwarding services encompass a range of activities, including
          transportation booking, documentation preparation, cargo
          consolidation, customs clearance, and delivery scheduling.
        </p>

        <p>
          <strong>Third-Party Provider:</strong> Any external entity,
          independent contractor, carrier, or service provider engaged by Cierta
          to perform a portion of the logistics, transportation, or supply chain
          functions. This term may refer to subcontractors or agents who provide
          specific services related to the movement, storage, handling, or
          clearance of goods as part of the overall service package.
        </p>

        <h2>Scope of Services</h2>

        <p>
          Cierta provides a comprehensive suite of integrated freight
          forwarding, logistics, and transportation solutions tailored to meet
          the diverse needs of businesses and/or individuals engaged in both
          domestic and international operations, whenever such needs arise.
          These Services are designed to support the efficient movement,
          management, and clearance of goods, ensuring that all processes comply
          with applicable legal, regulatory, and operational standards.
        </p>

        <p>
          <strong>Ocean Freight Transportation: </strong>Cierta coordinates
          the movement of goods via ocean-going vessels, facilitating
          containerized shipping, bulk cargo transport, and specialized
          services such as refrigerated and hazardous cargo. Cierta’s role
          includes booking cargo with third-party carriers, securing
          competitive freight rates, and managing the necessary documentation
          for international maritime transport.
        </p>

        <p>
          <strong>Air Freight Transportation: </strong> Cierta arranges for
          the transportation of cargo via air carriers, ensuring the timely
          and efficient delivery of goods that require expedited service or
          are time-sensitive in nature. This service includes the management
          of customs clearance at both the origin and destination airports and
          the provision of real-time shipment tracking.
        </p>

        <p>
          <strong>Ground Freight Transportation: </strong> Through the use of
          trusted land-based carriers, Cierta offers comprehensive ground
          freight solutions, including less-than-truckload (LTL) and full
          truckload (FTL) services. This includes coordination of pickups and
          deliveries to and from various geographic locations, using road,
          rail, or a combination of both methods.
        </p>

        <p>
          <strong>Customs Brokerage and Regulatory Compliance: </strong>{" "}
          Cierta assists businesses in complying with domestic and
          international trade regulations by providing customs brokerage
          services. This includes the preparation of all necessary customs
          documentation, payment of tariffs and duties, and facilitation of
          customs clearance procedures. Cierta ensures that shipments meet all
          regulatory requirements, including export control laws and
          international sanctions.
        </p>

        <p>
          <strong>Warehousing and Inventory Management: </strong> Cierta
          operates a network of secure, strategically located warehouses
          designed to handle goods for short- and long-term storage. Our
          services include inventory management, order fulfillment, packaging,
          labeling, and distribution. Additionally, Cierta offers value-added
          services such as cargo consolidation and deconsolidation.
        </p>

        <p>
          <strong>Freight Insurance Facilitation: </strong> In order to
          mitigate the risk associated with the transportation of goods,
          Cierta provides cargo insurance services. These services offer
          coverage for potential losses due to theft, damage, or natural
          disasters, subject to the terms and conditions specified in the
          respective insurance policy.
        </p>

        <p>
          <strong>Tracking and Visibility Services: </strong> Cierta offers
          robust, real-time shipment tracking services that provide visibility
          at every stage of the supply chain. These services utilize advanced
          technologies to allow clients to monitor the status of their
          shipments, including updates on customs clearance, transit progress,
          and estimated delivery times.
        </p>

        <p>
          <strong>Freight Rate Negotiation: </strong> Cierta negotiates
          competitive shipping rates with third-party carriers on behalf of
          its clients, ensuring that businesses and individuals benefit from
          cost-effective transportation solutions while maintaining the
          efficiency and reliability of their supply chains.
        </p>
        <p>
          It is important to note that while Cierta offers extensive
          coordination and logistics services, the company does not take
          physical possession or ownership of the cargo unless expressly
          stated in a separate agreement. Cierta acts as a third-party
          logistics provider (3PL) and transportation intermediary, as
          permitted by law.
        </p>

        <h2>Use of Services and Account Responsibilities</h2>
        <p>
          By accessing or utilizing Cierta’s Services, you acknowledge that you
          are solely responsible for all activities conducted under your account
          and for ensuring full compliance with applicable laws, regulations,
          and contractual obligations. You agree that all information you
          provide to Cierta, including shipment details, consignee information,
          customs documentation, and payment credentials, must be accurate,
          complete, and up to date. You assume full responsibility for any
          inaccuracies, omissions, or errors in the information provided, and
          Cierta shall not be liable for any losses, penalties, delays, or
          additional costs arising from such discrepancies. Any fraudulent,
          misleading, or unauthorized use of the Services constitutes a material
          breach of these Terms and may result in immediate termination of your
          access, cancellation of shipments, and legal action.
          <br />
          <br />
          You acknowledge that Cierta provides freight forwarding and logistics
          coordination services but does not take physical possession of cargo.
          Carriers, warehouse operators, and other third-party logistics
          providers engaged to transport, store, or handle your shipments
          operate independently and are not employees or agents of Cierta. You
          accept that once a shipment has been tendered to a third-party
          carrier, it is subject to that carrier’s terms and conditions,
          liability limitations, and operational policies. Cierta is not
          responsible for any actions, delays, damages, losses, or refusals of
          service by third parties.
          <br />
          <br />
          You agree to use Cierta’s Services solely for lawful purposes and in
          compliance with all applicable trade, customs, and transportation
          laws. Prohibited uses include, but are not limited to, engaging in
          fraudulent shipping activities, attempting to transport contraband,
          hazardous materials, or restricted goods without proper authorization,
          and misrepresenting shipment contents or values to evade duties,
          taxes, or regulatory controls. You acknowledge that shipments may be
          subject to inspections by customs authorities, government agencies,
          and security personnel, and you authorize Cierta to disclose shipment
          data to such authorities when legally required. Any violations of
          trade laws, sanctions, or embargoes, including but not limited to
          those imposed by the United States, the European Union, and the United
          Nations, may result in immediate termination of Services, seizure of
          cargo, financial penalties, and potential criminal liability.
          <br />
          <br />
          You are responsible for securing and protecting your account
          credentials, including usernames, passwords, and API keys, against
          unauthorized access or misuse. Cierta is not responsible for any
          unauthorized transactions, changes to shipment details, or service
          interruptions caused by compromised account credentials. You must
          immediately notify Cierta in the event of suspected account breaches,
          unauthorized changes to booking details, or fraudulent transactions.
          Failure to adhere to these Terms may result in suspension or
          termination of your account, rejection of shipments, or refusal of
          future service. Cierta reserves the right to monitor, audit, or
          investigate any suspected misuse of its Services and to take legal
          action where appropriate.
        </p>

        <h2>Payment Terms, Fees, and Billing Responsibilities</h2>
        <p>
          All Services provided by Cierta are subject to the payment of
          applicable fees, charges, and costs as agreed upon at the time of
          booking or as outlined in a separate contractual agreement. By using
          the Services, you agree to pay all invoiced amounts in full, without
          offset or deduction, within the specified payment period. Failure to
          remit payment within the agreed timeframe may result in the suspension
          of Services, additional late fees, and legal collection efforts.
          <br />
          <br />
          All freight rates, accessorial charges, customs duties, storage fees,
          and any other costs associated with transportation, warehousing,
          brokerage, or ancillary services are subject to change based on market
          conditions, carrier-imposed surcharges, fuel fluctuations, and
          government-imposed tariffs or fees. Cierta reserves the right to
          modify pricing without prior notice unless otherwise contractually
          agreed. Any estimates provided for transportation costs, transit
          times, or customs fees are for informational purposes only and do not
          constitute binding quotes.
          <br />
          <br />
          You acknowledge that any shipment tendered to Cierta is subject to
          carrier tariffs, general rate increases, peak season surcharges, and
          other operational adjustments beyond Cierta’s control. Any additional
          charges assessed by carriers, government agencies, port authorities,
          or customs regulators, including but not limited to detention fees,
          demurrage charges, customs penalties, or cargo re-routing costs, shall
          be your sole responsibility.
          <br />
          <br />
          Invoices issued by Cierta are payable in the currency specified and
          must be settled via approved payment methods, which may include wire
          transfers, automated clearing house (ACH) payments, or credit card
          transactions. Payments made via credit card may be subject to
          processing fees. Any disputes regarding invoiced amounts must be
          raised in writing within seven (7) business days of receipt. Disputes
          raised after this period will be deemed waived. Disputed amounts do
          not relieve you of the obligation to pay undisputed portions of the
          invoice by the due date.
          <br />
          <br />
          In the event of non-payment, Cierta reserves the right to suspend or
          cancel ongoing shipments, retain cargo in transit, impose interest on
          overdue amounts at the maximum rate permitted by law, and recover all
          legal, administrative, and collection costs incurred. If any payment
          remains unpaid beyond thirty (30) days, unless otherwise agreed upon
          in writing, Cierta reserves the right to take legal action, report the
          delinquency to credit agencies, or impose additional security
          requirements for future bookings.
          <br />
          <br />
          Cierta retains a lien on all shipments and cargo in its possession or
          control, including cargo stored at third-party warehouses or bonded
          facilities, until all outstanding balances are paid in full. You grant
          Cierta an irrevocable right to hold, dispose of, or liquidate cargo in
          accordance with applicable laws if payment remains unpaid after
          reasonable notice.
          <br />
          <br />
          By continuing to use Cierta’s Services, you acknowledge and agree to
          these payment obligations and understand that failure to comply may
          result in the denial of service, financial penalties, and legal
          enforcement.
        </p>

        <h2>Carrier and Third-Party Provider Responsibilities</h2>
        <p>
          By engaging Cierta’s freight forwarding and logistics services, you
          acknowledge and accept that the risk of loss, damage, delay, or
          misdelivery of cargo is inherent in the transportation and supply
          chain process. Cierta acts as a freight intermediary and does not take
          physical custody of shipments at any stage. As such, Cierta’s
          liability is strictly limited and governed by applicable national and
          international laws, carrier tariffs, and contractual agreements. Once
          cargo is tendered to a third-party carrier, warehouse operator, or
          customs authority, liability for loss, damage, or delay is transferred
          to the responsible entity under the terms of their service contract.
        </p>
        <p>
          <strong>Third-Party Provider Liability:</strong> The responsibility
          for the actual transportation of goods, including any potential
          delays, damage, or loss, lies primarily with the Third-Party Provider
          responsible for the movement of the cargo. The terms of carriage,
          including applicable liability limitations, claims procedures, and
          damage compensation policies, are governed by the respective Carrier's
          operating terms, which may include provisions under the Carmack
          Amendment (for U.S. domestic freight), the Montreal Convention (for
          air freight), or the Hague-Visby Rules (for ocean freight). You are
          strongly encouraged to review the Carrier’s terms to understand their
          liability limitations and obligations.
        </p>
        <p>
          <strong>Claims for Loss, Damage, or Delay:</strong> In the event that
          a shipment experiences loss, damage, or delay while under the care of
          a Third-Party Provider, the user must file a claim directly with the
          responsible Carrier or service provider, in accordance with the
          procedures outlined by that provider. Cierta will assist in
          facilitating claims where possible but assumes no direct liability for
          such incidents, nor does it guarantee the success or timeliness of any
          claim resolution process.
        </p>
        <p>
          <strong>Role of Cierta:</strong>Cierta’s role in coordinating the
          transportation and logistics services is strictly as a third-party
          intermediary. While Cierta may facilitate communication between the
          user and the Carrier, or assist with thepreparation of required
          documentation, we do not assume any direct responsibility for the
          actions, omissions, or performance of Third-Party Providers. Cierta’s
          liability is limited to the services directly provided by Cierta, and
          any claims arising from the actions of Third-Party Providers must be
          pursued through the appropriate channels with those entities.
        </p>
        <p>
          <strong>Subcontractors: </strong>Cierta reserves the right to engage
          subcontractors or additional service providers to assist in the
          fulfillment of any obligations under these Terms. Such subcontractors
          are bound by the same terms and conditions as Third-Party Providers,
          and you acknowledge and agree that Cierta shall not be liable for any
          failure, delay, or damage arising from the actions of such
          subcontractors.
          <br />
          <br />
          By utilizing Cierta’s freight forwarding services, you expressly waive
          any additional liability claims against Cierta beyond the statutory
          limits set forth by governing transportation laws and acknowledge that
          full-value protection requires separate cargo insurance coverage.
        </p>
        <h2>Disclaimers</h2>
        <p>
          YOUR USE OF THE SERVICE IS AT YOUR SOLE RISK. THE SERVICE (AND ALL
          OUTPUT DATA PROVIDED THEREIN) ARE PROVIDED ON AN "AS IS" AND "AS
          AVAILABLE" BASIS, WITHOUT ANY WARRANTIES OR REPRESENTATIONS, EXPRESS
          OR IMPLIED, OF ANY KIND. TO THE FULLEST EXTENT PERMITTED BY APPLICABLE
          LAW, WE HEREBY DISCLAIM ALL WARRANTIES AND REPRESENTATIONS, EITHER
          EXPRESS, IMPLIED, OR STATUTORY, WITH RESPECT TO THE SERVICE,
          INCLUDING, WITHOUT LIMITATION, ANY WARRANTIES OF (1) MERCHANTABILITY,
          FITNESS FOR A PARTICULAR PURPOSE, OR SUITABILITY FOR USE; (2)
          INFORMATIONAL CONTENT, ACCURACY, COMPLETENESS, OR RELIABILITY; (3)
          NON-INFRINGEMENT OF THIRD-PARTY RIGHTS; (4) PERFORMANCE, QUALITY, OR
          OPERABILITY; (5) TITLE; (6) THAT THE SERVICE WILL OPERATE ERROR-FREE,
          IN A TIMELY, SECURE, OR UNINTERRUPTED MANNER, OR BE FREE FROM VIRUSES,
          MALICIOUS CODE, OR OTHER HARMFUL COMPONENTS; (7) THAT THE SERVICE WILL
          BE CURRENT, UP-TO-DATE, OR THAT ANY DEFECTS OR ERRORS IN THE SERVICE
          WILL BE CORRECTED; (8) THAT THE SERVICE WILL BE COMPATIBLE WITH ANY
          PARTICULAR HARDWARE OR SOFTWARE PLATFORM; (9) THAT WE WILL ENFORCE THE
          TERMS OF SERVICE AGAINST THIRD PARTIES TO YOUR SATISFACTION; OR (10)
          WITH RESPECT TO OUR FREIGHT FORWARDING SERVICES, THAT SHIPMENTS WILL
          ARRIVE WITHIN EXPECTED TIMEFRAMES, BE UNIMPAIRED BY DAMAGE, OR AVOID
          ANY DELAYS, ADDITIONAL COSTS, OR LIABILITIES ARISING FROM
          CIRCUMSTANCES BEYOND OUR CONTROL, INCLUDING, BUT NOT LIMITED TO,
          FORCES MAJEURE, CUSTOMS ISSUES, WEATHER CONDITIONS, OR OTHER SHIPPING
          DISRUPTIONS. FURTHERMORE, WE MAKE NO GUARANTIES OR WARRANTIES
          REGARDING THE AVAILABILITY OF THE SERVICE, THE TIMELINESS OF ANY
          SERVICES PROVIDED, OR THE ACCURACY OF ANY INFORMATION OR DATA PROVIDED
          AS PART OF THE SERVICE. ANY EFFORTS BY US TO MODIFY OR IMPROVE THE
          SERVICE SHALL NOT BE CONSTRUED AS A WAIVER OF THESE LIMITATIONS OR ANY
          OTHER PROVISION OF THESE TERMS AND CONDITIONS.
          <br />
          <br />
          Some jurisdictions limit or do not allow the disclaimer of implied
          warranties or certain damages. In such cases, the disclaimers set
          forth herein shall apply only to the fullest extent permitted by
          applicable law.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          EXCEPT AS OTHERWISE PROVIDED IN THE CUSTOMER’S INDEMNIFICATION
          OBLIGATIONS SET FORTH HEREIN, UNDER NO CIRCUMSTANCES SHALL EITHER
          PARTY (NOR ITS RESPECTIVE OFFICERS, DIRECTORS, AGENTS, EMPLOYEES,
          REPRESENTATIVES, AFFILIATES, PARENTS, SUBSIDIARIES, SUCCESSORS AND
          ASSIGNS, INDEPENDENT CONTRACTORS, OR ANY OTHER RELATED PARTIES) BE
          LIABLE TO THE OTHER PARTY FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
          CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, LOSS OF PROFITS, LOSS
          OF USE, LOSS OF DATA, INTERRUPTION OF BUSINESS, OR ANY OTHER DAMAGES
          ARISING OUT OF OR IN ANY WAY CONNECTED WITH (i) THE USE OR INABILITY
          TO USE THE SERVICE, (ii) ANY DELAY OR FAILURE TO PERFORM UNDER THESE
          TERMS, (iii) ANY BREACH OF SECURITY, (iv) ANY CONTENT, PRODUCTS,
          AND/OR SERVICES OBTAINED THROUGH OR VIEWED ON THE SERVICE, OR (v)
          OTHERWISE ARISING OUT OF OR IN CONNECTION WITH THE USE OR OPERATION OF
          THE SERVICE, WHETHER ARISING UNDER CONTRACT, TORT (INCLUDING
          NEGLIGENCE, GROSS NEGLIGENCE, OR WILLFUL MISCONDUCT), STRICT
          LIABILITY, STATUTORY LIABILITY, COMMON LAW, OR OTHERWISE, EVEN IF SUCH
          DAMAGES WERE FORESEEABLE AND EVEN IF THE RESPECTIVE PARTY HAS BEEN
          ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
          <br />
          <br />
          WITHOUT LIMITING THE FOREGOING, IN THE EVENT OF A CLAIM RELATING TO
          THE FREIGHT FORWARDING SERVICES, NEITHER PARTY SHALL BE LIABLE FOR ANY
          LOSS, DAMAGE, DELAY, OR NON-DELIVERY OF GOODS RESULTING FROM (a) FORCE
          MAJEURE EVENTS, (b) CIRCUMSTANCES OUTSIDE OF OUR REASONABLE CONTROL,
          INCLUDING BUT NOT LIMITED TO, WEATHER CONDITIONS, NATURAL DISASTERS,
          WAR, TERRORISM, CUSTOMS DELAYS, GOVERNMENTAL ACTIONS, TRANSPORTATION
          DISRUPTIONS, OR (c) ANY NEGLIGENCE, FAULT, OR ACT OR OMISSION OF THE
          SHIPPER, CARRIER, CONSIGNEE, OR THIRD-PARTY SERVICE PROVIDERS ENGAGED
          IN THE DELIVERY OR TRANSPORTATION PROCESS.
          <br />
          <br />
          IN NO EVENT SHALL OUR AGGREGATE LIABILITY TO YOU FOR ANY AND ALL
          CLAIMS, DEMANDS, ACTIONS, SUITS, OR CAUSES OF ACTION ARISING UNDER OR
          IN CONNECTION WITH THESE TERMS, INCLUDING, WITHOUT LIMITATION, IN
          RESPECT OF THE SERVICE, THE FREIGHT FORWARDING SERVICES, OR ANY
          RELATED CLAIM, EXCEED AN AMOUNT EQUAL TO THE TOTAL FEES PAID BY YOU TO
          US FOR THE SERVICE DURING THE TWELVE (12) MONTH PERIOD IMMEDIATELY
          PRECEDING THE DATE ON WHICH THE CLAIM AROSE.
          <br />
          <br />
          FURTHER, ANY DISCLAIMERS OR EXCLUSIONS OF LIABILITY APPEARING WITHIN
          THE SERVICE OR THIS AGREEMENT, INCLUDING BUT NOT LIMITED TO THE
          SPECIFIC EXCLUSION OF LIABILITY RELATING TO FREIGHT FORWARDING
          SERVICES, ARE INCORPORATED HEREIN BY REFERENCE AND SHALL BE DEEMED TO
          FORM A PART OF THIS LIMITATION OF LIABILITY. IN THE EVENT OF ANY
          CONFLICT BETWEEN SUCH DISCLAIMERS AND THIS PROVISION, THE STRICTER OR
          MORE RESTRICTIVE TERMS SHALL APPLY.
          <br />
          <br />
          Some jurisdictions may restrict or otherwise limit the enforceability
          of certain disclaimers, limitations, or exclusions of liability in
          contracts. To the extent that such laws are applicable, this section
          shall be construed and enforced to the fullest extent permitted by
          applicable law, and any unforceable provision shall be deemed
          severable from the remaining provisions of this agreement.
        </p>

        <h2>Dispute Resolution, Arbitration, and Governing Law</h2>
        <p>
          <strong>Dispute Resolution Procedure:</strong> In the event of any
          dispute, claim, or controversy arising from or in connection with
          these Terms, the utilization of Cierta’s Services, or any freight
          forwarding, logistics, or supply chain transaction, the parties shall
          initially seek to resolve the matter through good faith negotiations.
          If the dispute cannot be amicably resolved through direct discussions,
          both parties agree to engage in formal mediation, conducted by an
          independent mediator mutually agreed upon by both parties. The
          mediation shall be scheduled within thirty (30) days of a written
          request by either party, with each party bearing its own costs related
          to the mediation, unless otherwise mutually agreed.
          <br />
          <br />
          In the event that mediation does not result in a resolution of the
          dispute, the matter shall be escalated to binding arbitration, as
          detailed herein, subject to the mutual agreement of both parties.
        </p>
        <p>
          <strong>Binding Arbitration Agreement:</strong> To the fullest extent
          permitted by applicable law, any dispute that remains unresolved after
          the mediation process may, at the mutual agreement of both parties, be
          submitted to final and binding arbitration. The arbitration shall be
          administered by a recognized arbitration institution, such as the
          American Arbitration Association (AAA) or the International Chamber of
          Commerce (ICC). The arbitration proceedings shall be conducted in
          English and held at a location mutually agreed upon by the parties. In
          the absence of such an agreement, the location shall be determined by
          the chosen arbitration institution.
          <br />
          <br />
          The arbitrator(s) shall have the exclusive authority to resolve all
          matters related to these Terms, including but not limited to issues of
          interpretation, enforceability, validity, and breach. However, the
          arbitrator(s) shall have no authority to award punitive, exemplary, or
          consequential damages. The decision rendered by the arbitrator(s)
          shall be final, binding, and enforceable in any court of competent
          jurisdiction.
          <br />
          <br />
          Each party shall bear its own legal fees, arbitration costs, and any
          related expenses, except where applicable arbitration rules allow the
          prevailing party to recover such costs.
          <br />
          <br />
          <strong>Class Action and Jury Trial Waiver:</strong> The parties may,
          by mutual agreement, elect to resolve disputes through arbitration
          rather than litigation. If both parties agree to proceed with
          arbitration, they may, at their discretion, waive the right to
          initiate or participate in any class action lawsuit, collective
          proceeding, or representative claim. Any claims shall be resolved
          strictly on an individual basis, and neither party shall seek to
          consolidate claims with others or pursue legal action as part of a
          group.
          <br />
          <br />
          Additionally, unless both parties mutually agree to waive the right to
          a jury trial, they may choose whether or not to waive any right to a
          trial by jury in connection with any dispute arising from or relating
          to these Terms.
        </p>

        <p>
          <strong>Exceptions to Arbitration Agreement:</strong> Notwithstanding
          the foregoing provisions, either party shall have the right to
          initiate or pursue legal action in the following circumstances,
          irrespective of the decision to arbitrate:
          <ul>
            <br />
            <li>
              <strong>Small Claims Court:</strong> In the event that a dispute
              qualifies for adjudication under the jurisdictional limits of a
              small claims court, either party may seek resolution in such
              court, provided that the dispute falls within the applicable legal
              thresholds for small claims proceedings.
            </li>
            <br />
            <li>
              <strong>Injunctive Relief and Equitable Remedies:</strong>{" "}
              Notwithstanding any agreement to arbitrate, either party may seek
              immediate injunctive relief or other equitable remedies from a
              court of competent jurisdiction in circumstances where there
              exists an urgent and substantial threat of harm to a party's
              confidential information, intellectual property, proprietary
              rights, or other protected interests that necessitate immediate
              judicial intervention to prevent irreparable damage.
            </li>
            <br />
            <li>
              <strong>Enforcement or Challenge to Arbitration Award:</strong>{" "}
              Either party may seek to enforce or challenge the enforcement of
              any arbitration award, including but not limited to seeking
              confirmation, vacating, modifying, or setting aside an arbitration
              award, before a court of competent jurisdiction, in accordance
              with applicable law and the relevant provisions of the Federal
              Arbitration Act or other applicable arbitration statutes.
            </li>
          </ul>
        </p>
        <p>
          <strong>Governing Law and Jurisdiction:</strong> These Terms shall be
          governed by, and construed in accordance with, the laws of the
          Commonwealth of Kentucky, without regard to its conflict of law
          principles or provisions governing choice of law. The parties
          expressly agree that any and all legal actions, claims, or proceedings
          arising out of or relating to these Terms, including but not limited
          to the enforcement of arbitration awards, requests for injunctive
          relief, or any other equitable remedies, shall be instituted and
          adjudicated exclusively in the state courts of Jefferson County,
          Kentucky, or in the United States District Court for the Western
          District of Kentucky, as applicable, and shall be subject to the
          jurisdiction of such courts.
          <br />
          <br />
          Both parties hereby irrevocably submit to the personal jurisdiction,
          venue, and exclusive jurisdiction of the state and federal courts
          located in the aforementioned forum, and expressly waive any and all
          objections to such jurisdiction or venue, including, without
          limitation, any objections based on the appropriateness or propriety
          of such forum. Furthermore, the parties unconditionally waive any
          right to contest the jurisdiction, venue, or appropriateness of the
          designated forum in any future or subsequent legal actions or
          proceedings, whether at law or in equity.
          <br />
          <br />
          In the case of services provided to individual clients,
          notwithstanding the foregoing, if an individual client, being a
          resident of a jurisdiction outside of Kentucky, would suffer
          significant inconvenience or undue hardship by being compelled to
          litigate in Kentucky, such individual client may, in accordance with
          applicable laws governing the rights of individuals, be entitled to
          pursue any claim or dispute in a court of competent jurisdiction
          located in the individual client's home state or country, provided
          that such forum is consistent with the legal rights and protections
          afforded to the individual client under the laws of the jurisdiction
          in which the individual client resides.
        </p>

        <h2>
          Indemnification, Liability for Third-Party Actions, and Risk
          Allocation
        </h2>
        <p>
          By using Cierta’s Services, you agree to take full responsibility for
          your actions, omissions, and any consequences that may arise from your
          use of freight forwarding, logistics, and supply chain solutions. You
          acknowledge that shipping goods across domestic and international
          borders involves legal, financial, and operational risks, and you
          accept full liability for compliance with applicable laws, regulatory
          requirements, and contractual obligations. If any claim, demand, legal
          action, government investigation, or financial loss arises due to your
          conduct, misrepresentation, negligence, or failure to comply with
          these Terms, you agree to indemnify, defend, and hold Cierta harmless
          from any resulting damages, penalties, or liabilities.
          <br />
          <br />
          This obligation to indemnify includes responsibility for any losses or
          legal expenses incurred by Cierta due to incorrect shipment
          documentation, misdeclared cargo, unpaid fees, customs violations,
          non-compliance with trade sanctions, failure to disclose hazardous
          goods, or breach of contractual obligations. If Cierta faces
          regulatory fines, carrier-imposed penalties, or litigation due to your
          actions, you agree to fully reimburse Cierta for all associated costs,
          including attorney’s fees, court expenses, and settlement amounts.
          Cierta reserves the right to assume control of its legal defense in
          such matters, and you shall cooperate fully in any proceedings.
          <br />
          <br />
          You acknowledge that Cierta does not own or operate transportation
          assets such as trucks, ships, aircraft, or warehouses, and instead
          arranges services through third-party carriers, freight handlers,
          customs brokers, warehouse operators, and logistics subcontractors.
          These independent entities operate under their own service agreements,
          policies, and liability limitations, which may vary depending on
          jurisdiction, mode of transport, and specific contract terms. You
          accept that Cierta is not responsible for the acts, errors, omissions,
          negligence, delays, or service failures of third-party providers, and
          that any claims for cargo loss, damage, or misdelivery must be pursued
          directly with the responsible entity under the terms of their
          respective contracts and liability provisions.
          <br />
          <br />
          If any third-party service provider imposes additional fees due to
          storage delays, customs holds, rerouting, detention, demurrage, or
          other unforeseen events, you remain solely responsible for settling
          those charges. Cierta shall not be liable for costs imposed by
          carriers, port authorities, regulatory agencies, or any other external
          parties. Any financial obligations that arise during the course of
          service execution, including increased tariffs, emergency surcharges,
          or fuel adjustments, must be covered by you in accordance with the
          final invoiced amounts.
          <br />
          <br />
          Given the inherent risks in transportation, you acknowledge that all
          shipments are subject to industry-standard liability limitations.
          Compensation for lost, damaged, or delayed shipments is governed by
          applicable legal frameworks such as the Montreal Convention for air
          freight, the Hague-Visby Rules for ocean freight, and the Carmack
          Amendment for domestic trucking. Unless cargo insurance is obtained
          separately, carrier liability is limited based on statutory caps,
          which may not reflect the full commercial value of your goods. You
          expressly waive any claims against Cierta that exceed the applicable
          carrier liability limits, and you acknowledge that Cierta does not
          assume responsibility for cargo losses beyond those prescribed limits,
          unless otherwise agreed upon in writing. If you wish to obtain
          full-value protection, you must arrange for appropriate cargo
          insurance through a licensed insurer before shipment execution.
          <br />
          <br />
          By continuing to use Cierta’s Services, you confirm that you have
          reviewed and understood these risk allocation provisions, that you are
          aware of your indemnification obligations, and that you accept all
          liabilities associated with your transactions. You further acknowledge
          that Cierta shall not be held responsible for any consequential,
          indirect, or punitive damages, lost profits, business interruptions,
          or contractual penalties resulting from delays, service disruptions,
          or cargo losses beyond its direct control.
        </p>

        <h2>Termination, Suspension, and Survival of Obligations</h2>
        <p>
          Cierta reserves the right to terminate or suspend your access to the
          Services at its sole discretion if you violate any provisions of these
          Terms, fail to meet payment obligations, engage in fraudulent or
          unlawful activities, or use the Services in a manner that disrupts
          operations or presents risk to Cierta, its affiliates, or third-party
          partners. Termination may be immediate and without prior notice if the
          violation is deemed severe, such as willful non-compliance with trade
          laws, submission of fraudulent documentation, or attempts to transport
          prohibited or restricted goods.
          <br />
          <br />
          Suspension of Services may occur if an investigation is required to
          determine whether a violation has taken place. During suspension, you
          may be unable to access your account, modify shipments, or receive
          logistics support until the matter is resolved. Cierta is not
          responsible for any resulting delays, storage fees, or additional
          costs incurred during the suspension period. If your account is
          reinstated, you remain responsible for all outstanding charges, and
          additional security measures may be required to continue using the
          Services.
          <br />
          <br />
          If your account is terminated, any ongoing shipments may be canceled,
          and cargo in transit may be returned, held at a bonded facility, or
          released to the consignee depending on the status of payment, customs
          clearance, and carrier policies. Any costs associated with cargo
          redirection, storage, or disposal are your sole responsibility.
          Termination does not relieve you of outstanding financial obligations,
          and Cierta retains the right to pursue collection efforts, enforce
          liens, or take legal action to recover unpaid balances.
          <br />
          <br />
          Certain obligations under these Terms survive termination, including
          provisions related to liability limitations, indemnification, dispute
          resolution, governing law, and confidentiality. Any rights or
          obligations that, by their nature, extend beyond the termination of
          your account shall remain enforceable.
          <br />
          <br />
          By continuing to use the Services, you acknowledge that termination or
          suspension does not waive any rights Cierta may have under law or
          contract, and you remain bound by any obligations incurred before
          termination.
        </p>

        <h2>Confidentiality, Data Protection, and Intellectual Property</h2>
        <p>
          Cierta recognizes the importance of confidentiality and data security
          in freight forwarding and logistics operations. By using the Services,
          you acknowledge that any non-public business, operational, or
          technical information shared between you and Cierta, including
          shipment details, pricing agreements, trade routes, customer data, and
          proprietary systems, shall be treated as confidential. Both parties
          agree to take reasonable measures to prevent unauthorized disclosure,
          use, or access to such information. Cierta shall not disclose
          confidential information except where required by law, government
          authorities, or as necessary to fulfill contractual obligations with
          third-party carriers, customs brokers, and service providers. You also
          agree not to share, distribute, or use Cierta’s confidential
          information for any purpose other than the intended logistics
          services.
          <br />
          <br />
          Data protection is governed by applicable privacy laws, and Cierta
          implements industry-standard security measures to protect personal and
          commercial data. However, you acknowledge that no system is immune to
          cyber risks and that Cierta shall not be held liable for unauthorized
          access, data breaches, or transmission errors beyond its reasonable
          control. Any sensitive or proprietary data you transmit through
          Cierta’s platform must be done using secure and legally compliant
          methods. If any unauthorized access or security breach is suspected,
          both parties agree to notify each other promptly and cooperate to
          mitigate any risks.
          <br />
          <br />
          All intellectual property related to the Services, including software,
          proprietary tracking systems, website content, trademarks, trade
          names, and operational methodologies, remains the exclusive property
          of Cierta. You are granted a limited, non-exclusive, and
          non-transferable right to use the Services solely for their intended
          purpose. You may not reproduce, distribute, modify, reverse-engineer,
          or exploit any part of Cierta’s intellectual property without prior
          written consent. Any violation of intellectual property rights may
          result in immediate termination of access and potential legal action.
          <br />
          <br />
          By continuing to use the Services, you acknowledge that Cierta retains
          full ownership of all proprietary technologies, operational
          frameworks, and trade secrets developed or used in connection with its
          freight forwarding and logistics solutions. Any unauthorized use,
          misappropriation, or disclosure of Cierta’s intellectual property
          shall constitute a material breach of these Terms and may result in
          legal consequences.
        </p>

        <h2>
          Miscellaneous Terms, Party Relationship, and Assignment Restrictions
        </h2>
        <p>
          These Terms constitute the entire agreement between you and Cierta
          regarding the use of the Services and supersede any prior discussions,
          negotiations, or understandings, whether written or oral. No waiver of
          any provision shall be valid unless expressly made in writing by
          Cierta. Any failure by Cierta to enforce a contractual right or
          provision shall not be deemed a waiver of that right, nor shall it
          prevent Cierta from enforcing it at a later time. If any part of these
          Terms is found to be invalid, unlawful, or unenforceable by a court of
          competent jurisdiction, the remaining provisions shall continue in
          full force and effect.
          <br />
          <br />
          You agree that your relationship with Cierta is strictly that of an
          independent business entity engaging a logistics service provider, and
          nothing in these Terms shall be interpreted as creating a partnership,
          agency, or joint venture. You do not have the authority to act on
          behalf of Cierta, enter into contracts in Cierta’s name, or assume any
          obligations beyond the scope of your specific freight transactions.
          <br />
          <br />
          All communications related to these Terms, including legal notices,
          billing inquiries, or claims, shall be in writing and sent to the
          official contact addresses provided by Cierta. Electronic
          communications such as email may be used for operational notices, but
          legal disputes, formal claims, and contract modifications shall
          require physical documentation or authorized electronic signatures.
          <br />
          <br />
          Neither party shall, without the prior written consent of the other
          party, which consent shall not be unreasonably withheld, conditioned,
          or delayed, assign, transfer, delegate, or otherwise dispose of any of
          its rights, interests, or obligations under These Terms, whether
          voluntarily or by operation of law, including, without limitation, by
          merger, acquisition, or change of control. Any attempted assignment,
          transfer, or delegation in contravention of this provision shall be
          deemed null and void from the outset and of no force or effect.
        </p>
      </div>
    </section>
  );
};

export default TermsAndConditions;
