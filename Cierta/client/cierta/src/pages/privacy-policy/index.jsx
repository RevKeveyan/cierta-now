import React, { useEffect } from "react";
import { useLocation } from 'react-router-dom';

import "./style.scss";
import { color } from "framer-motion";

const TermsAndConditions = () => {
  const location = useLocation();
  useEffect(() => {
    if (location.state?.scrollTo === "privacy") {
      const target = document.getElementById("privacy");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);
  return (
    <section id="privacy" className="legal-page">
      <div  className="container">
        <h2 >Privacy Policy</h2>
        <br />
        <strong className="legal-page-date">Effective date: 04/12/2025</strong>
        <br />
        <br />
        <p>
          Cierta Corporation, along with its subsidiaries and affiliates
          (“Cierta,” “we,” “us,” or “our”), is committed to safeguarding your
          privacy. This statement outlines how we collect, use, share, and
          protect your personal information.
          <br />
          <br />
          This Privacy Policy governs the collection of personal information
          through this website, ciertacorp.com (the “Website”), as well as any
          information you provide to us or that we collect via online forms,
          email or SMS campaigns, mobile applications, software, or any other
          Cierta product or service that incorporates this Privacy Policy by
          reference. For the purposes of this Policy, these platforms, including
          the Website, are collectively referred to as the “Site.”
          <br />
          <br />
          For all users and visitors accessing the Site from outside the United
          States, any information you provide, including personal information,
          will be transferred to and processed on servers located within the
          United States. Your personal information will be managed in accordance
          with this Privacy Policy and applicable U.S. laws, which may offer a
          different level of data protection than the laws in your country of
          residence.
          <br />
          <br />
          Cierta retains the sole discretion to amend, revise, update, or
          otherwise modify these Terms at any time without prior notice, and
          such modifications will be effective immediately upon posting to our
          website or notifying you directly through any of the means of
          communication available. Continued use of the Services
          post-modification will indicate your acceptance of the revised Terms.
        </p>
        <br />
        <h2>The Information We Collect About You</h2>
        <h4>Information You Provide to Us or Authorize Us to Receive</h4>

        <p>
          We collect information that you voluntarily provide or authorize us to
          receive. This may occur when you create an account, request a quote,
          inquire about product details, or engage with the Site’s products and
          services. The information collected through the Site may include, but
          is not limited to, the following:
        </p>

        <ul>
          <li>Your name</li>
          <li>Your email address</li>
          <li>Your phone number</li>
          <li>Your fax number</li>
          <li>Your address</li>
          <li>Your organization</li>
          <li>Your customer number</li>
          <li>Your rep group</li>
          <li>
            Information that you enter, in narrative form, into request forms,
            live customer service chats, or inquiries or other communications
            submitted by email
          </li>
          <li>Your username and password for your account</li>
          <li>U.S. Department of Transportation Number</li>
          <li>FMCSA Operating Authority Number (MC Number)</li>
          <li>
            Additional account profile information, such as preferred language
          </li>
        </ul>

        <h2>Surveys and Contests</h2>

        <p>
          Periodically, the Site may invite users to participate in surveys or
          contests, which are entirely voluntary. By choosing to participate,
          you acknowledge and consent to the collection and processing of the
          information requested. Such information may include, but is not
          limited to, personally identifiable information (e.g., name, mailing
          address) and demographic data (e.g., zip code, age range). For contest
          participants, the contact information provided will be used to notify
          winners, facilitate the distribution of prizes, and may be processed
          for additional purposes as expressly disclosed at the time of
          collection. Survey responses will be utilized for analytical and
          research purposes, including but not limited to, assessing user
          engagement, enhancing Site functionality, and improving Cierta’s
          products and services. Cierta may engage third-party service providers
          to administer surveys either directly through the Site or via external
          platforms, websites, or applications. By participating in such
          surveys, you acknowledge and agree that the collection, use, and
          processing of your information will be governed by the terms and
          conditions and privacy policies of the respective third-party service
          provider, for which Cierta disclaims any liability. Participants are
          encouraged to review the applicable third-party policies prior to
          providing any personal information.
        </p>

        <h2>Information We Collect Through Technology</h2>
        <p>
          Cierta utilizes technological tools and automated data collection
          mechanisms to enhance our ability to deliver and optimize our
          services. When you access or interact with the Site, we may
          automatically collect certain information, including but not limited
          to, your domain name, Internet Protocol (IP) address, browser type and
          version, operating system details, and the referring website that
          directed you to our Site. Additionally, the Site employs tracking
          technologies to gather analytical and usage data, such as visitor
          traffic patterns, frequency of access, engagement metrics, page
          interaction details, most utilized browsers, and other statistical
          insights. This data collection functions similarly to audience
          measurement systems, such as television ratings, that assess user
          engagement and content performance. By accessing or using the Site,
          you acknowledge and consent to the collection, processing, and
          potential use of such information for purposes including, but not
          limited to, enhancing system security, improving the user experience,
          conducting data analytics, optimizing website functionality, and
          complying with applicable legal and regulatory obligations. Cierta may
          also engage third-party service providers to facilitate such data
          collection, subject to their respective terms of service and privacy
          policies.
        </p>

        <h2>Use of Cookies, Tags, and Related Tracking Technologies</h2>
        <p>
          Cierta employs cookies, tags, and related tracking technologies
          (collectively, “Cookies”) to facilitate the collection of certain data
          and enhance user experience on the Site. Cookies are small data files
          that a website or its authorized third-party service provider
          transmits to a user’s computer, mobile device, or browser. These files
          enable the Site to recognize returning users, retain user preferences,
          and improve browsing efficiency. By utilizing Cookies, Cierta is able
          to analyze and retain user preferences to streamline subsequent visits
          to the Site. For instance, when a user revisits the Site, Cookies
          facilitate the recognition of the user’s browser, allowing for a more
          seamless and customized browsing experience while reducing the need to
          manually re-enter preferences or credentials. Furthermore, Cierta
          collaborates with third-party advertising providers who deploy Cookies
          to collect data regarding user interactions with the Site and other
          external websites. This information enables the implementation of
          interest-based advertising, wherein tailored advertisements are
          delivered based on users’ browsing behaviors and inferred preferences.
          Users retain the ability to manage Cookie settings through their
          respective web browsers. Depending on the browser, individuals may
          configure their settings to receive notifications when a Cookie is
          utilized or to disable certain Cookies altogether. However,
          restricting or disabling certain Cookies may result in limited
          functionality or diminished performance of certain Site features.
          Additionally, users seeking to learn more about managing Cookies used
          for interest-based advertising by third parties are encouraged to
          review their browser settings or explore industry resources that
          provide guidance on opt-out mechanisms. By accessing or continuing to
          use the Site, you acknowledge and consent to Cierta’s use of Cookies
          in accordance with this Privacy Policy and applicable data protection
          laws.
        </p>

        <h2>Device Identification</h2>
        <p>
          Cierta may collect and process unique device identifiers, including
          but not limited to device identification numbers, advertising
          identifiers, user identification credentials, and other persistent
          identifiers (collectively, “Device ID”). Such data collection is
          conducted in accordance with applicable data protection laws and is
          used to analyze, evaluate, and improve the functionality, security,
          and reliability of Cierta’s digital platforms, applications, and
          related services. Additionally, Device ID data may be processed for
          Cierta’s internal business operations, including but not limited to
          business intelligence, data analytics, customer relationship
          management, sales optimization, marketing strategies, and talent
          acquisition efforts. In certain instances, Device ID data may also be
          leveraged to support targeted advertising, personalized marketing
          communications, and other promotional activities, in compliance with
          applicable legal and regulatory requirements. By accessing or using
          the Site or any Cierta digital service, you acknowledge and consent to
          the collection, processing, and use of Device ID information for these
          purposes, subject to the terms of this Privacy Policy and all
          applicable laws.
        </p>
        <h2>Do Not Track (“DNT”) Browser Preference</h2>
        <p>
          Do Not Track (“DNT”) is a privacy preference that users can enable
          within their web browser settings to signal their intent to opt out of
          the collection of personal information by websites they visit. While
          DNT is designed to provide users with greater control over their
          online privacy, there is no universally accepted industry standard
          governing its implementation. As a result, the Site does not currently
          recognize or respond to DNT signals across all pages and features.
          Notwithstanding a user’s selection of the DNT preference, Cierta does
          not engage in the collection of personal information regarding a
          user’s online activities over time and across third-party websites or
          online services for tracking or profiling purposes. However, Cierta
          may utilize trusted third-party service providers to analyze website
          usage, monitor Site performance, enhance security, and prevent
          fraudulent activity. These third-party service providers may collect
          personal information about users or their online activities on this
          Site and across different websites over time through the use of
          Cookies, tracking technologies, or other lawful data collection
          methods. Additionally, Cierta may aggregate and anonymize collected
          data for lawful business purposes, including but not limited to
          optimizing operational efficiencies, enhancing the functionality of
          the Site, improving service offerings, and conducting research and
          analytics. All such data collection, processing, and usage shall be
          conducted in accordance with this Privacy Policy and applicable data
          protection laws and regulations.
        </p>

        <h2>
          Links to and Integration with Third-Party Websites, Applications, and
          Plug-Ins
        </h2>
        <p>
          The Site may contain embedded links, integrations, or plug-ins that
          facilitate access to external websites, applications, and digital
          services operated by third parties, including but not limited to
          interactive features such as social media buttons (e.g., Twitter
          buttons, LinkedIn buttons) (collectively, “Third-Party Sites”). These
          Third-Party Sites are not owned, operated, controlled, or maintained
          by Cierta, and Cierta disclaims any and all responsibility or
          liability for the data collection, processing, security, or privacy
          practices of such Third-Party Sites. Users acknowledge and agree that
          their interactions with Third-Party Sites, including but not limited
          to the submission of any personal information, financial data, or
          authentication credentials, are undertaken at their sole discretion
          and risk. The collection, use, disclosure, and retention of personal
          or non-personal information by Third-Party Sites are governed
          exclusively by the respective privacy policies, terms of use, and
          applicable legal and regulatory requirements of those Third-Party
          Sites. Cierta neither endorses nor makes any representations or
          warranties regarding the privacy, security, data protection, or
          business practices of any Third-Party Site. It is the sole
          responsibility of the user to review and assess the privacy policies
          and terms of service of any Third-Party Site prior to accessing,
          utilizing, or submitting any information through such platforms.
          Cierta expressly disclaims any and all liability arising from or
          related to a user’s voluntary engagement with Third-Party Sites,
          including but not limited to data breaches, unauthorized disclosures,
          or misuse of personal information by such third parties.
        </p>

        <h2>Use of Collected Information</h2>
        <p>
          Cierta collects, processes, and utilizes the information obtained from
          users to facilitate, enhance, and optimize the provision of services,
          improve the functionality and usability of the Site, and support
          legitimate business operations. Such data processing activities are
          conducted in accordance with applicable data protection laws,
          regulatory requirements, and this Privacy Policy. The purposes for
          which Cierta may use the collected information include, but are not
          limited to:
          <br />
          <br />
          <ul>
            <li>
              Responding to inquiries, service requests, and other user
              communications in a timely and efficient manner; Processing,
              fulfilling, and managing orders, transactions, or service-related
              requests;
            </li>
            <li>
              Conducting internal research, analytics, and performance
              assessments to enhance operational efficiencies; Developing,
              implementing, and executing marketing, promotional, and
              advertising initiatives related to Cierta’s products and services,
              in compliance with applicable laws governing marketing
              communications and consumer privacy;
            </li>
            <li>
              Administering and managing contests, sweepstakes, promotional
              campaigns, and surveys in accordance with applicable legal and
              regulatory requirements;
            </li>
            <li>
              Continuously assessing, monitoring, and improving customer service
              operations, digital interactions, and the overall online user
              experience to enhance engagement and satisfaction.{" "}
            </li>
          </ul>
        </p>
        <p>
          Additionally, Cierta may aggregate, anonymize, and analyze collected
          data for internal business purposes, including but not limited to
          optimizing service delivery, streamlining operational workflows,
          improving technological infrastructure, and enhancing the
          functionality and security of the Site. All such data processing and
          usage shall be conducted in compliance with applicable laws,
          regulations, and best practices governing data privacy and security.
        </p>

        <h2>Disclosure of Personal Information</h2>
        <p>
          Cierta does not sell, rent, or trade personal information to third
          parties. However, in the course of conducting business operations and
          providing services, Cierta may disclose personal information under the
          following circumstances, in accordance with applicable laws and
          regulatory requirements:
          <br />
          <br />
          <strong>Business Associates:</strong> Cierta may share personal
          information with its business associates, including but not limited to
          customers, third-party motor carriers, and other authorized partners,
          as necessary to facilitate transportation, logistics, and other
          related services. For instance, if a user submits a request for
          temperature-controlled freight shipping, Cierta may share relevant
          information with an approved refrigerated carrier to fulfill the
          request. All such disclosures shall be conducted in a manner
          consistent with applicable contractual obligations and legal
          requirements.
          <br />
          <br />
          <strong>Third-Party Service Providers:</strong> Cierta may engage
          third-party service providers pursuant to contractual agreements to
          assist in the provision of services, business operations, and
          marketing activities. Such third parties may include, but are not
          limited to, data analytics providers, technology vendors, advertising
          agencies, and legal counsel. For example, Cierta may retain a
          third-party provider to assess and identify marketing materials that
          may be of interest to users. Additionally, Cierta may disclose
          personal information to legal professionals in connection with the
          procurement of legal advice or representation. All third-party service
          providers retained by Cierta are contractually obligated to implement
          appropriate safeguards to protect personal information in a manner
          consistent with Cierta’s internal policies, industry standards, and
          applicable laws.
          <br />
          <br />
          <strong>Legally Mandated Disclosures:</strong>Cierta may be required
          to disclose personal information in response to a valid legal process,
          including but not limited to a court order, subpoena, civil discovery
          request, law enforcement investigation, regulatory inquiry, or any
          other legal obligation imposed by applicable federal, state, or
          international law.
          <br />
          <br />
          <strong>Legal Compliance and Protection of Rights:</strong> Cierta
          reserves the right to disclose personal information when such
          disclosure is necessary to comply with applicable laws, enforce legal
          agreements, or protect the rights, property, or safety of Cierta, its
          employees, users, or third parties. This may include, but is not
          limited to, exchanging information with law enforcement agencies,
          regulatory authorities, financial institutions, and other entities for
          purposes of fraud prevention, cybersecurity protection, credit risk
          mitigation, and other legally permissible security measures.
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
          <br />
          <br />
          <strong>Corporate Transactions:</strong> In the event of a potential
          or actual merger, acquisition, reorganization, consolidation, sale of
          assets, bankruptcy, or other corporate transaction involving Cierta,
          personal information may be disclosed to prospective or actual
          purchasers, investors, legal representatives, and other relevant
          parties. Any such disclosure shall be conducted in compliance with
          applicable legal, regulatory, and contractual obligations, including
          data protection laws governing such transfers.
          <br />
          <br />
          Cierta exercises commercially reasonable efforts to ensure that any
          disclosure of personal information is conducted in accordance with
          applicable legal, regulatory, and contractual obligations while
          maintaining the confidentiality, integrity, and security of such
          information.
        </p>

        <h2>Safeguarding and Security of Collected Information</h2>
        <p>
          Cierta recognizes the critical importance of maintaining the security,
          confidentiality, and integrity of personal information. To this end,
          Cierta has implemented a comprehensive framework of administrative,
          technical, and physical safeguards designed to prevent unauthorized
          access, disclosure, alteration, and misuse of personal information in
          compliance with applicable data protection laws, industry standards,
          and regulatory requirements. Cierta enforces stringent access
          controls, ensuring that only authorized personnel with a legitimate
          business need—such as customer service representatives—are granted
          access to personal information. Access privileges are strictly
          governed by internal policies and procedures, and employees who handle
          personal information receive ongoing training regarding security
          protocols, data protection obligations, and privacy best practices.
          Upon the implementation of any new security or privacy policy,
          relevant employees are promptly notified and required to acknowledge
          and adhere to the updated protocols. Furthermore, Cierta’s data
          storage systems are housed within secure, access-restricted facilities
          equipped with advanced security mechanisms designed to mitigate risks
          associated with unauthorized intrusion, data breaches, or malicious
          cyber activities. Cierta continuously evaluates and enhances its
          cybersecurity posture by employing state-of-the-art intrusion
          detection systems, firewalls, data loss prevention technologies, and
          other security measures in alignment with industry best practices.
          Despite Cierta’s commercially reasonable efforts to implement and
          maintain robust security measures, it is important to acknowledge that
          no method of data transmission or storage is entirely immune to risk.
          Consequently, while Cierta endeavors to protect personal information
          to the fullest extent permissible by law, absolute security cannot be
          guaranteed. Users are encouraged to take proactive measures to
          safeguard their own personal information, including but not limited to
          using strong, unique passwords for their accounts, logging out of
          accounts and closing browser sessions after accessing the Site,
          implementing multi-factor authentication where applicable, and
          remaining vigilant against phishing attempts, fraudulent
          communications, and unauthorized access to their devices. By using the
          Site, users acknowledge and accept that while Cierta takes
          commercially reasonable steps to protect personal information, no
          security system is infallible, and users assume the inherent risks
          associated with digital communications and online data processing.
        </p>

        <h2>Children</h2>
        <p>
          The Service is not intended for minors under the age of 16 and we do
          not knowingly collect personal information from individuals under the
          age of 16. If we learn that we have collected personal information
          from a minor under the age of 16, we will promptly delete that
          information.
        </p>

        <h2>
          Ownership Rights and Use of Voluntarily Submitted Information and
          Materials
        </h2>
        <p>
          Cierta exclusively retains all rights, title, and interest in and to
          any information voluntarily submitted through the Site, as well as any
          photographs, documents, creative works, written content, data
          compilations, or other forms of authorship or materials (collectively,
          "Contributed Materials") that users provide through the Site, except
          as otherwise expressly stipulated in applicable Terms and Conditions.
          By voluntarily submitting Contributed Materials, users acknowledge and
          agree that Cierta shall possess an irrevocable, royalty-free,
          worldwide, sublicensable, assignable, and perpetual right to use,
          reproduce, distribute, display, perform, modify, adapt, translate,
          create derivative works from, or otherwise exploit such Contributed
          Materials for any lawful purpose, including but not limited to
          commercial, advertising, promotional, operational, and marketing
          purposes, without further notice, attribution, compensation, or
          obligation to the user. Users further acknowledge and agree that
          Cierta is under no obligation to return, maintain, store, or preserve
          any Contributed Materials, and Cierta expressly reserves the right to
          delete, alter, or modify any Contributed Materials at its sole
          discretion, subject to applicable intellectual property laws. To the
          extent that any moral rights, rights of attribution, or rights of
          integrity exist in the Contributed Materials, users expressly waive
          such rights and grant Cierta full discretion to modify, adapt, or
          transform the materials in any manner it deems appropriate, except
          where such waiver is prohibited by law. Users warrant that they
          possess full legal rights, authority, and necessary permissions to
          submit the Contributed Materials and that such submission does not
          infringe upon any third-party intellectual property rights,
          proprietary rights, privacy rights, or contractual obligations. Minors
          under the age of 18 are strictly prohibited from submitting any
          Contributed Materials without the express, verifiable consent of a
          parent or legal guardian. Cierta disclaims any liability arising from
          the unauthorized submission of Contributed Materials by minors and
          reserves the right to remove any such materials upon discovery or
          notification of noncompliance. By submitting Contributed Materials,
          users acknowledge and affirm that they have read, understood, and
          agree to these terms and any applicable legal and regulatory
          provisions governing intellectual property rights.
        </p>
        <h2>Copyright Notice and Intellectual Property Rights</h2>
        <p>
          All content, materials, and proprietary elements contained within the
          Site, including but not limited to text, images, graphics, animations,
          videos, music, sounds, data compilations, software, and any other
          forms of intellectual property (collectively, the “Site Content”), are
          the exclusive property of Cierta Corporation and are protected by
          applicable United States and international copyright, trademark, and
          intellectual property laws. Unless expressly stated otherwise, all
          Site Content is subject to copyright protection and other proprietary
          rights owned or controlled by Cierta. Cierta exclusively retains all
          rights, title, and interest in and to the selection, coordination,
          compilation, arrangement, and enhancement of the Site Content. The
          reproduction, modification, distribution, transmission, republication,
          display, performance, licensing, sale, or creation of derivative works
          based on any Site Content, in whole or in part, is strictly prohibited
          without the prior express written consent of Cierta. Unauthorized use,
          duplication, or exploitation of any Site Content for commercial
          purposes or any other purpose not expressly permitted by Cierta may
          result in civil and/or criminal penalties under applicable
          intellectual property laws. Users are expressly prohibited from
          copying, modifying, distributing, transmitting, displaying,
          performing, publishing, selling, licensing, or otherwise exploiting
          any Site Content for commercial purposes, nor may Site Content be
          reposted to any third-party website or platform without Cierta’s prior
          express written authorization. Cierta reserves all rights not
          expressly granted herein and may enforce its intellectual property
          rights to the fullest extent permitted by law. Any unauthorized use of
          Site Content shall constitute a material breach of these terms and may
          subject the violator to legal action, including but not limited to
          claims for damages, injunctive relief, and attorney’s fees.
        </p>
        <h2>Changes to this Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time to reflect changes
          in our practices or applicable laws. If we make any material changes
          to this Privacy Policy, we will notify you by email (if you have
          provided us with your email address) or through a notice on our
          Website prior to the change becoming effective. We encourage you to
          review this Privacy Policy periodically for any updates or changes.
        </p>
        <h2>How to Contact Us</h2>
<p>
  If you have any questions or concerns about this Privacy Policy or our
  privacy practices, please contact us at:
</p>

<div className="contact-info">
  <p><strong>Cierta Corporation</strong></p>
  <p><strong>Physical address:</strong> 710 East Main Street, Lexington, Kentucky 40502, United States</p>
  <p><strong>Phone:</strong> (606) 660-6618</p>
  <p><strong>Email:</strong> management@ciertacorp.com</p>
</div>

      </div>
    </section>
  );
};

export default TermsAndConditions;
