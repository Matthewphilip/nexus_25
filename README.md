Setup instructions:

npm run dev

Comments:

I have used atomic design for the component structure in the vue3 typescript build with scss for styling.
At atom level I started with the aim of making the components reusable (relating mostly to computed styles). With Typeography for instance, I have in the past split out font size, type, weight, colour etc into their own props, however with limited time I have used the computed classes to bundle these and style for various scenarios). The component is still reusable, just not how I would like and would have done it given more time.
I have experienced an unusually heavy workload recently which has kept time tight, however under normal circumstances I would have liked to add unit testing to test data fetch, car valuation submission, and various other bits of functionality. I would have also liked to add some of the functionality in various components to a utilities file, for instance dealing with reformatting words for capitalisation etc.
Although I have tried to follow the atomic principles, given more time I would have liked to split out the structure of the organism ResultsHeader and use molecule groupings more effectively here. I would have liked to do the same with CardDetails and split it out a little more.
The header I have fixed the width at mobile and tablet, but allowed to be more responsive >tablet screen size.
