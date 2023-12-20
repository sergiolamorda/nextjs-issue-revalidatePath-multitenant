## revalidatePath with middleware doesn't work on multi-tenant project

### Explanation

We're working on a multi-tenant project that employs middleware to rewrite requests, converting the host into a slug.

In Next.js 12, you can perform on-demand revalidation in the API using res.revalidate(), which only invalidates the cache for the domain where the request was made.

However, after migrating to Next.js 14, we encountered issues when trying to invalidate the cache with revalidatePath; it doesn't seem to work as expected.

Attempting revalidatePath('/domain/test') doesn't take the middleware into account and fails to produce any effect.

On the other hand, using revalidatePath('/test') results in invalidating the /test path across all domains.

### Steps to Reproduce

First, add two domains to your local hostname, for example:

```
127.0.0.1	test1.local
127.0.0.1	test2.local
```

hen, execute the build and start commands:

```
npm run build
npm run start
```

Next, open two different tabs and navigate to http://test1.local:3000/test and http://test2.local:3000/test respectively.

Now, make a POST request to http://localhost:3000/api/revalidate, which will execute revalidatePath('/test2.local/test'). If you reload the previous tab, the content does not update.

Finally, make a POST request to http://localhost:3000/api/revalidate2, which will execute revalidatePath('/test'). If you reload the previous tabs, both will show updated content.